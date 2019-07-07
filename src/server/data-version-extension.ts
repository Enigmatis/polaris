import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import { PolarisContext } from './polaris-context';

export class DataVersionExtension extends GraphQLExtension {
    willSendResponse(responseContext: {
        graphqlResponse: GraphQLResponse;
        context: PolarisContext;
    }) {
        const { context, graphqlResponse } = responseContext;

        graphqlResponse.extensions = {
            ...graphqlResponse.extensions,
            dataVersion: 1,
        };

        return responseContext;
    }
}
