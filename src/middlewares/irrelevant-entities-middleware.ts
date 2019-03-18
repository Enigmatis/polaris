import { injectable } from 'inversify';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class IrrelevantEntitiesMiddleware implements Middleware {
    preResolve({ args }: RequestMiddlewareParams) {
        return;
    }

    postResolve({ result }: ResponseMiddlewareParams): string | null {
        return result;
    }
}
