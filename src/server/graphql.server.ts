import { LoggerConfiguration, PolarisLogger } from '@enigmatis/polaris-logs';
import { Config, makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { inject, injectable, multiInject } from 'inversify';
import {
    LogConfig,
    POLARIS_TYPES,
    PolarisMiddleware,
    PolarisProperties,
    PolarisServerConfig,
    SchemaCreator,
} from '..';
import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';
import { createMiddleware } from '../middlewares/polaris-middleware-creator';
const app = express();

export interface GraphQLServer {
    start(): void;
}

@injectable()
export class PolarisGraphQLServer implements GraphQLServer {
    @inject(POLARIS_TYPES.PolarisLogger) public polarisLogger!: PolarisLogger;
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
            ...middlewares.map(createMiddleware),
        );
        this.logProperties = logConfig.getLogConfiguration();
        this.polarisProperties = propertiesConfig.getPolarisProperties();
        const config: Config = {
            schema: executableSchemaWithMiddlewares,
            context: ({ req }: { req: any }) => ({
                headers: new PolarisRequestHeaders(req.headers),
                body: req.body,
            }),
        };
        this.server = new ApolloServer(config);
        if (this.polarisProperties.endpoint !== undefined) {
            this.server.applyMiddleware({ app, path: this.polarisProperties.endpoint });
        } else {
            this.server.applyMiddleware({ app });
        }
    }

    public start() {
        const options = {} as any;
        if (this.polarisProperties.port !== undefined) {
            options.port = this.polarisProperties.port;
        }
        app.listen(options, () => {
            this.polarisLogger.info(
                `🚀 Server ready at http://localhost:${options.port}${this.server.graphqlPath}`,
            );
        });
    }
}
