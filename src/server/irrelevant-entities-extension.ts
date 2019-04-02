import { GraphQLExtension } from 'graphql-extensions';

export class IrrelevantEntitiesExtension extends GraphQLExtension {
    willSendResponse(responseContext: any) {
        const { context, graphqlResponse } = responseContext;

        if (context.headers.dataVersion) {
            graphqlResponse.extensions = {
                irrelevantEntities: context.irrelevantEntities.getIrrelevantEntitiesPerQuery(),
            };
        }

        return responseContext;
    }
}
