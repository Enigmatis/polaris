import { ResponseMiddlewareParams } from '../middleware';

export interface MiddlewareCondition {
    shouldBeReturned(params: ResponseMiddlewareParams, isSubEntity?: boolean): boolean;
}
