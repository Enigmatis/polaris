import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned({ context, result }: ResponseMiddlewareParams, isSubEntity: boolean): boolean {
        const dataVersionHeader = context.headers.dataVersion;
        return !dataVersionHeader || isSubEntity || result.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
