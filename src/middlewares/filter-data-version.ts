import { GraphQLResolveInfo } from 'graphql';
import { injectable } from 'inversify';
import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';
import { PolarisMiddleware } from './polaris-middleware';

@injectable()
export class FilterDataVersionMiddleware implements PolarisMiddleware {
    public preResolve(
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
    ) {
        return;
    }

    public postResolve(
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
        result: any,
    ) {
        const polarisHeaders: PolarisRequestHeaders = context.headers;
        if (
            !(polarisHeaders.dataVersion && root && root.dataVersion < polarisHeaders.dataVersion)
        ) {
            return result;
        }
    }
}
