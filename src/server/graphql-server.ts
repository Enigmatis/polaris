import { SoftDeleteConfiguration } from '@enigmatis/utills';
import { ApolloServer, Config, PubSub } from 'apollo-server-koa';
import { GraphQLError, GraphQLFormattedError, GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import * as http from 'http';
import { inject, injectable, multiInject, optional } from 'inversify';
import * as Koa from 'koa';
import * as koaBody from 'koa-bodyparser';
import { PolarisServerConfig } from '../common/injectable-interfaces';
import { IrrelevantEntitiesContainer } from '../common/irrelevant-entities-container';
import { getHeaders } from '../http/request/polaris-request-headers';
import { ResponseHeadersExtension } from '../http/response/response-headers-extension';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { PolarisGraphQLLogger } from '../logging/polaris-graphql-logger';
import { Middleware } from '../middlewares/middleware';
import { createMiddleware } from '../middlewares/polaris-middleware-creator';
import { PolarisProperties } from '../properties/polaris-properties';
import { RealitiesHolderValidator } from '../realities-holder/realities-holder-validator';
import { IrrelevantEntitiesExtension } from './irrelevant-entities-extension';
import { PolarisContext } from './polaris-context';

export interface GraphQLServer {
    server: ApolloServer;

    start(app?: Koa<any, {}>): void;

    stop(): void;
}

export type contextCreator = (ctx: Koa.Context) => object;

@injectable()
export class PolarisGraphQLServer implements GraphQLServer {
    server: ApolloServer;
    private app: Koa;
    private polarisProperties: PolarisProperties;
    private customContexts: contextCreator[] = [];
    private httpServer?: http.Server;

    constructor(
        @inject(POLARIS_TYPES.GraphQLSchema) schema: GraphQLSchema,
        @inject(POLARIS_TYPES.PolarisServerConfig) propertiesConfig: PolarisServerConfig,
        @multiInject(POLARIS_TYPES.Middleware) middlewares: Middleware[],
        @inject(POLARIS_TYPES.GraphQLLogger) private polarisLogger: PolarisGraphQLLogger,
        @inject(POLARIS_TYPES.RealitiesHolderValidator)
        private realitiesHolderValidator: RealitiesHolderValidator,
        @inject(POLARIS_TYPES.SoftDeleteConfiguration)
        private softDeleteConfiguration?: SoftDeleteConfiguration,
        @inject(POLARIS_TYPES.ApolloConfig) @optional() private userApolloConfig: Config = {},
    ) {
        const executableSchemaWithMiddleware = applyMiddleware(
            schema,
            ...(middlewares.map(createMiddleware) as any),
        );
        this.polarisProperties = propertiesConfig.polarisProperties;

        const config: Config = {
            schema: executableSchemaWithMiddleware,
            context: (args: { ctx: Koa.Context; connection: any }) => this.getContext(args),
            formatError: (error: any) => this.formatError(error),
            formatResponse: (response: any) => this.formatResponse(response),
            extensions: [
                () => new IrrelevantEntitiesExtension(),
                () => new ResponseHeadersExtension(),
            ],
            ...userApolloConfig,
        };
        this.server = new ApolloServer(config);
        this.app = new Koa();
        this.app.use(koaBody());
    }

    async start(app = this.app) {
        return new Promise(resolve => {
            if (this.polarisProperties.endpoint) {
                this.server.applyMiddleware({ app, path: this.polarisProperties.endpoint });
            } else {
                this.server.applyMiddleware({ app });
            }
            const port = this.polarisProperties.port;
            this.httpServer = app.listen(port, () => {
                this.polarisLogger.info(
                    `🚀 Server ready at http://localhost:${port}${this.server.graphqlPath}`,
                );
                this.polarisLogger.info(
                    `🚀 Subscriptions ready at ws://localhost:${port}${
                        this.server.subscriptionsPath
                    }`,
                );
                resolve();
            });
            if (this.polarisProperties.includeSubscription) {
                this.server.installSubscriptionHandlers(this.httpServer);
            }
        });
    }

    stop() {
        if (this.httpServer) {
            this.httpServer.close();
        }
    }

    addContextCreator(...contextCreators: contextCreator[]) {
        this.customContexts.push(...contextCreators);
    }

    private formatResponse(response: any) {
        if (response.data && !response.data.__schema && !response.data.__type) {
            this.polarisLogger.info(`Finished response, answer is ${JSON.stringify(response)}`);
        }
        return response;
    }

    private formatError(error: GraphQLError): GraphQLFormattedError {
        this.polarisLogger.error('Apollo server error', {
            polarisLogProperties: { throwable: error },
        });

        return {
            message: error.message,
            path: error.path,
            locations: error.locations,
            extensions: error.extensions,
        };
    }

    private getContext({ ctx, connection }: { ctx: Koa.Context; connection: any }): PolarisContext {
        try {
            if (!connection) {
                const context: PolarisContext = this.getHttpContext(ctx);
                this.realitiesHolderValidator.validateRealitySupport(context);
                return context;
            } else {
                return { body: {}, pubSub: new PubSub() } as any;
            }
        } catch (e) {
            this.polarisLogger.error('Context error', {
                polarisLogProperties: { throwable: e },
            });
            throw new Error(e.message);
        }
    }

    private getHttpContext(ctx: Koa.Context): PolarisContext {
        const headers = getHeaders(ctx.request.headers);
        const context: PolarisContext = {
            headers,
            body: ctx.request.body,
            softDeleteConfiguration: this.softDeleteConfiguration,
            irrelevantEntities: new IrrelevantEntitiesContainer(),
            ...this.getCustomContext(ctx),
        };
        if (this.polarisProperties.includeSubscription) {
            context.pubSub = new PubSub();
        }
        return context;
    }

    private getCustomContext(ctx: Koa.Context): object[] {
        return this.customContexts.map(creator => creator(ctx));
    }
}
