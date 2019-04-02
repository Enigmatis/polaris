import { ApolloError, ApolloServer, Config, PubSub } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import * as http from 'http';
import { inject, injectable, multiInject } from 'inversify';
import * as Koa from 'koa';
import * as koaBody from 'koa-bodyparser';
import { PolarisServerConfig } from '../common/injectable-interfaces';
import { getHeaders } from '../http/request/polaris-request-headers';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { PolarisGraphQLLogger } from '../logging/polaris-graphql-logger';
import { Middleware } from '../middlewares/middleware';
import { createMiddleware } from '../middlewares/polaris-middleware-creator';
import { PolarisProperties } from '../properties/polaris-properties';
import { PolarisContext } from './polaris-context';

export interface GraphQLServer {
    start(): void;
}

export type contextCreator = (ctx: Koa.Context) => object;

@injectable()
export class PolarisGraphQLServer implements GraphQLServer {
    private app: Koa;
    private server: ApolloServer;
    private polarisProperties: PolarisProperties;
    private customContexts: contextCreator[] = [];
    private httpServer?: http.Server;

    constructor(
        @inject(POLARIS_TYPES.GraphQLSchema) schema: GraphQLSchema,
        @inject(POLARIS_TYPES.PolarisServerConfig) propertiesConfig: PolarisServerConfig,
        @multiInject(POLARIS_TYPES.Middleware) middlewares: Middleware[],
        @inject(POLARIS_TYPES.GraphQLLogger) private polarisLogger: PolarisGraphQLLogger,
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
        };
        this.server = new ApolloServer(config);
        this.app = new Koa();
        this.app.use(koaBody());
    }

    start(app = this.app) {
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
                `🚀 Subscriptions ready at ws://localhost:${port}${this.server.subscriptionsPath}`,
            );
        });
        if (this.polarisProperties.includeSubscription) {
            this.server.installSubscriptionHandlers(this.httpServer);
        }
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

    private formatError(error: any) {
        this.polarisLogger.error('Apollo server error', {
            polarisLogProperties: { throwable: error },
        });

        if (error instanceof ApolloError || error.name === 'GraphQLError') {
            return { message: error.message, code: error.extensions.code };
        } else {
            return new Error('Internal server error');
        }
    }

    private getContext({ ctx, connection }: { ctx: Koa.Context; connection: any }): PolarisContext {
        try {
            if (!connection) {
                return this.getHttpContext(ctx);
            } else {
                return { body: {}, pubSub: new PubSub() } as any;
            }
        } catch (e) {
            this.polarisLogger.error('Headers error', {
                polarisLogProperties: { throwable: e },
            });
            throw new Error('Unable to format headers');
        }
    }

    private getHttpContext(ctx: Koa.Context) {
        const headers = getHeaders(ctx.request.headers);
        const context: PolarisContext = {
            headers,
            body: ctx.request.body,
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
