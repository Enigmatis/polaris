import { GraphQLExtension } from 'graphql-extensions';

export class ExtensionContextBuilder extends GraphQLExtension {
    willSendResponse(o: any) {
        const { context, graphqlResponse } = o;

        graphqlResponse.extensions = context.extensions;

        return o;
    }
}
