import { LoggerConfiguration, PolarisLogger } from '@enigmatis/polaris-logs';
import { Config, makeExecutableSchema } from 'apollo-server';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { inject, injectable, multiInject } from 'inversify';
import { LogConfig, PolarisServerConfig } from '../common/injectable-interfaces';
import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { createMiddleware } from '../middlewares/polaris-middleware-creator';
import { PolarisProperties } from '../properties/polaris-properties';
import { SchemaCreator } from '../schema/utils/schema.creator';

const app = express();

export interface GraphQLServer {
    start(): void;
}

@injectable()
export class PolarisGraphQLServer implements GraphQLServer {
    @inject(POLARIS_TYPES.PolarisLogger) polarisLogger!: PolarisLogger;
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
            context: ({ req }: { req: any }) => ({
                headers: new PolarisRequestHeaders(req.headers),
            }),
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
