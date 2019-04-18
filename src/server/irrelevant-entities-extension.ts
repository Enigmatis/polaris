import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import { PolarisContext } from './polaris-context';

export class IrrelevantEntitiesExtension extends GraphQLExtension {
    willSendResponse(responseContext: {
        graphqlResponse: GraphQLResponse;
        context: PolarisContext;
    }) {
        const { context, graphqlResponse } = responseContext;

        if (context.headers.dataVersion) {
            graphqlResponse.extensions = {
                irrelevantEntities: context.irrelevantEntities.irrelevantContainer,
            };
        }

        return responseContext;
    }
}
