import { GraphQLClient } from 'graphql-request';
import * as polarisPropertiesPath from './config/properties.json';

export const url = `http://localhost:${polarisPropertiesPath.port}${
    polarisPropertiesPath.endpoint
}`;

export const graphqlRequest = async (data: string, headers: any, variables: any) => {
    const graphQLClient = new GraphQLClient(url, { headers });
    const result = await graphQLClient.request(data, variables);
    return result;
};
