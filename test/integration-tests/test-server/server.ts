import { GraphQLClient } from 'graphql-request';
import { Container } from 'inversify';
import {
    GraphQLServer,
    POLARIS_TYPES,
    polarisContainer,
    PolarisServerConfig,
} from '../../../src/main';
import { TestLogConfig } from './config/log-config';
import { TestMiddlewaresConfig } from './config/middleware-config';
import { TestServerConfig } from './config/server-config';
import { schema } from './schema/schema';

polarisContainer.bind(POLARIS_TYPES.LoggerConfig).to(TestLogConfig);
polarisContainer.bind(POLARIS_TYPES.PolarisServerConfig).to(TestServerConfig);
polarisContainer.bind(POLARIS_TYPES.MiddlewaresConfig).to(TestMiddlewaresConfig);

const mergedContainer = Container.merge(polarisContainer, schema);
const serverConfig: PolarisServerConfig = mergedContainer.get(POLARIS_TYPES.PolarisServerConfig);
export const url = `http://localhost:${serverConfig.polarisProperties.port}${
    serverConfig.polarisProperties.endpoint
}`;
export const server: GraphQLServer = mergedContainer.get(POLARIS_TYPES.GraphQLServer);
server.start();

export async function graphqlRequest(data: string, headers: any, variables: any) {
    const graphQLClient = new GraphQLClient(url, {
        headers,
    });
    const result = await graphQLClient.request(data, variables);
    return result;
}
