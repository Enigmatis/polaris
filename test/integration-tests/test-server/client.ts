import { GraphQLClient } from 'graphql-request';
import * as polarisPropertiesPath from './config/properties.json';

export const url = `http://localhost:${polarisPropertiesPath.port}${
    polarisPropertiesPath.endpoint
}`;

export const graphQLRequest = async (data: string, headers: any, variables: any = undefined) => {
    const graphQLClient = new GraphQLClient(url, { headers });
    return graphQLClient.request(data, variables);
};

export const graphqlRawRequest = async (data: string, headers: any, variables: any = undefined) => {
    const graphQLClient = new GraphQLClient(url, { headers });
    return graphQLClient.rawRequest(data, variables);
};
