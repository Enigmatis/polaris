import { GraphqlLogger } from '@enigmatis/utills';
import { polarisContainer } from '../../../src/inversion-of-control/container-manager';
import { POLARIS_TYPES } from '../../../src/inversion-of-control/polaris-types';
import { GraphQLServer } from '../../../src/server/graphql-server';
import { TestLogConfig } from './config/log-config';
import { TestMiddlewaresConfig } from './config/middleware-config';
import { TestServerConfig } from './config/server-config';
import { schema } from './schema/schema';
import { TestRealitiesHolder } from './test-realities-holder';

polarisContainer.bind(POLARIS_TYPES.LoggerConfig).to(TestLogConfig);
polarisContainer.bind(POLARIS_TYPES.PolarisServerConfig).to(TestServerConfig);
polarisContainer.bind(POLARIS_TYPES.MiddlewaresConfig).to(TestMiddlewaresConfig);
polarisContainer.bind(POLARIS_TYPES.GraphQLSchema).toConstantValue(schema);
polarisContainer.rebind(POLARIS_TYPES.RealitiesHolder).to(TestRealitiesHolder);

export class TestServer {
    server: GraphQLServer;

    constructor() {
        this.server = polarisContainer.get<GraphQLServer>(POLARIS_TYPES.GraphQLServer);
    }
}

export const logger = polarisContainer.get<GraphqlLogger<any>>(POLARIS_TYPES.GraphQLLogger);
