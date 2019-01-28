import {PolarisMiddleware} from './polaris-middleware';
import {inject, injectable} from 'inversify';
import {GraphQLResolveInfo} from 'graphql';
import POLARIS_TYPES from '../inversion-of-control/polaris-types';
import {PolarisRequestHeaders} from '../http/request/polarisRequestHeaders';
import {PolarisLogger} from '@enigmatis/polaris-logs';

@injectable()
export class FilterDataVersionMiddleware implements PolarisMiddleware {
    @inject(POLARIS_TYPES.PolarisLogger) polarisLogger: PolarisLogger;

    preResolve(root: any, args: { [argName: string]: any }, context: any, info: GraphQLResolveInfo) {

    }

    postResolve(root: any, args: { [argName: string]: any }, context: any, info: GraphQLResolveInfo, result) {
        let polarisHeaders: PolarisRequestHeaders = context.headers;
        console.log(result);
        if (!(polarisHeaders.dataVersion && root && root.dataVersion < polarisHeaders.dataVersion)) {
            return result;
        }
    }

}