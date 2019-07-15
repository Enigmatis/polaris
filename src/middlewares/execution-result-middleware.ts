import { injectable } from 'inversify';
import { isExecutionResultResponse } from '../common/execution-result-validator';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class ExecutionResultMiddleware implements Middleware {
    preResolve({ args }: RequestMiddlewareParams) {
        return;
    }

    postResolve(params: ResponseMiddlewareParams): any {
        if (isExecutionResultResponse(params.result)) {
            params.context.executionMetadata = params.result.executionMetadata;
            return params.result.result;
        }

        return params.result;
    }
}
