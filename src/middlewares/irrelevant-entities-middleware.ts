import { injectable } from 'inversify';
import { isContainsIrrelevant } from '../common/query-irrelevant-result';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class IrrelevantEntitiesMiddleware implements Middleware {
    preResolve({ args }: RequestMiddlewareParams) {
        return;
    }

    postResolve(params: ResponseMiddlewareParams): any {
        if (!params.result || params.context.headers.dataVersion === undefined) {
            return params.result;
        }
        if (isContainsIrrelevant(params.result)) {
            params.context.irrelevantEntities = params.result.irrelevantEntities;
            return params.result.result;
        }
        return params.result;
    }
}
