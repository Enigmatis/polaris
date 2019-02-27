import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned(
        { root, context, result }: ResponseMiddlewareParams,
        subEntity: boolean,
    ): boolean {
        const dataVersionHeader = context.headers.dataVersion;
        return !dataVersionHeader || subEntity || result.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
