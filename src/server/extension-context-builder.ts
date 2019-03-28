import { GraphQLExtension } from 'graphql-extensions';

export class ExtensionContextBuilder extends GraphQLExtension {
    willSendResponse(responseContext: any) {
        const { context, graphqlResponse } = responseContext;

        if (context.headers.dataVersion) {
            graphqlResponse.extensions = {irrelevantEntities: context.irrelevantEntities};
        }

        return responseContext;
    }
}
