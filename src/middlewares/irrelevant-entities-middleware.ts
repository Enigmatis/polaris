import { injectable } from 'inversify';
import { isIrrelevantEntitiesResponse } from '../common/query-irrelevant-result';
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
        if (isIrrelevantEntitiesResponse(params.result)) {
            params.context.irrelevantEntities = params.result.irrelevantEntities;
            return params.result.relevantEntities;
        }
        return params.result;
    }
}
