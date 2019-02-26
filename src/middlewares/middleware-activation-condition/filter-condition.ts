import { ResponseMiddlewareParams } from '../middleware';
export interface MiddlewareCondition {
    shouldBeReturned(params: ResponseMiddlewareParams, subEntity?: boolean): boolean;
}

export interface MiddlewaresConfiguration {
    dataVersion?: boolean;
    realityId?: boolean;
}
