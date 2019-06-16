import { GraphQLExtension, GraphQLResponse } from 'graphql-extensions';
import { PolarisContext } from '../../server/polaris-context';

export const requestIdHeaderName: string = 'Request-Id';
export const oicdClaimUpnHeaderName: string = 'Oicd-Claim-Upn';
export const realityIdHeaderName: string = 'Reality-Id';

export class ResponseHeadersExtension extends GraphQLExtension {
    willSendResponse(responseContext: {
        graphqlResponse: GraphQLResponse;
        context: PolarisContext;
    }) {
        const { context, graphqlResponse } = responseContext;
        if (graphqlResponse.http && graphqlResponse.http.headers) {
            const headers = [];
            if (context.headers.requestId !== undefined) {
                headers.push([requestIdHeaderName, context.headers.requestId]);
            }
            if (context.headers.upn !== undefined) {
                headers.push([oicdClaimUpnHeaderName, context.headers.upn]);
            }
            if (context.headers.realityId !== undefined) {
                headers.push([realityIdHeaderName, context.headers.realityId]);
            }
            // @ts-ignore
            graphqlResponse.http = { headers };
        }
        return responseContext;
    }
}
