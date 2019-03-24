import { injectable } from 'inversify';
import { isContainsIrrelevant } from '../common/query-irr-result';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class IrrelevantEntitiesMiddleware implements Middleware {
    preResolve({ args }: RequestMiddlewareParams) {
        return;
    }

    postResolve(params: ResponseMiddlewareParams): any {
        if (!params.result) {
            return;
        }
        if (isContainsIrrelevant(params.result)) {
            params.context.extensions.irrelevantEntities = params.result.irr;
            return params.result.result;
        }
        return params.result;
    }
}
