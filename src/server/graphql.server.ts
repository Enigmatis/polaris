import { LoggerConfiguration, PolarisLogger } from '@enigmatis/polaris-logs';
import { ApolloServer, Config, makeExecutableSchema } from 'apollo-server-koa';
import { applyMiddleware } from 'graphql-middleware';
import { inject, injectable, multiInject } from 'inversify';
import * as Koa from 'koa';
import * as koaBody from 'koa-bodyparser';

import { LogConfig, PolarisServerConfig } from '../common/injectable-interfaces';
import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { createMiddleware } from '../middlewares/polaris-middleware-creator';
import { PolarisProperties } from '../properties/polaris-properties';
import { SchemaCreator } from '../schema/utils/schema.creator';
import { PolarisContext } from './polaris-context';

const app = new Koa();
app.use(koaBody());

export interface GraphQLServer {
    start(): void;
}

@injectable()
export class PolarisGraphQLServer implements GraphQLServer {
    @inject(POLARIS_TYPES.GraphqlLogger) polarisLogger!: PolarisLogger;
    private server: ApolloServer;
    private polarisProperties: PolarisProperties;
    private logProperties: LoggerConfiguration;

    constructor(
        @inject(POLARIS_TYPES.SchemaCreator) creator: SchemaCreator,
        @inject(POLARIS_TYPES.LogConfig) logConfig: LogConfig,
        @inject(POLARIS_TYPES.PolarisServerConfig) propertiesConfig: PolarisServerConfig,
        @multiInject(POLARIS_TYPES.PolarisMiddleware) middlewares: PolarisMiddleware[],
    ) {
        const schema = creator.generateSchema();
        const executableSchemaDefinition: { typeDefs: any; resolvers: any } = {
            typeDefs: schema.def,
            resolvers: schema.resolvers,
        };
        const executableSchema = makeExecutableSchema(executableSchemaDefinition);

        const executableSchemaWithMiddlewares = applyMiddleware(
            executableSchema,
            ...(middlewares.map(createMiddleware) as any),
        );
        this.logProperties = logConfig.getLogConfiguration();
        this.polarisProperties = propertiesConfig.getPolarisProperties();
        const config: Config = {
            schema: executableSchemaWithMiddlewares,
            context: ({ ctx }: { ctx: Koa.Context }): PolarisContext => ({
                headers: new PolarisRequestHeaders(ctx.request.headers),
            }),
            formatError: (error: Error) => {
                this.polarisLogger.error('apollo server Error', { throwable: error });
                return new Error('Internal server error');
            },
        };
        this.server = new ApolloServer(config);
        if (!this.polarisProperties.endpoint) {
            this.server.applyMiddleware({ app, path: this.polarisProperties.endpoint });
        } else {
            this.server.applyMiddleware({ app });
        }
    }

    start() {
        const port = this.polarisProperties.port;
        app.listen(port, () => {
            this.polarisLogger.info(
                `🚀 Server ready at http://localhost:${port}${this.server.graphqlPath}`,
            );
        });
    }
}
