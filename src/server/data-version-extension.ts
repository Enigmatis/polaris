import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import { PolarisContext } from './polaris-context';

export class DataVersionExtension extends GraphQLExtension {
    willSendResponse(responseContext: {
        graphqlResponse: GraphQLResponse;
        context: PolarisContext;
    }) {
        const { context, graphqlResponse } = responseContext;
        if (context.body.operationName !== 'IntrospectionQuery') {
            graphqlResponse.extensions = {
                ...graphqlResponse.extensions,
                dataVersion: context.executionMetadata && context.executionMetadata.dataVersion,
            };
        }
        return responseContext;
    }
}
