import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned({ root, context }: ResponseMiddlewareParams): boolean {
        const dataVersionHeader = context.headers.dataVersion;
        return !dataVersionHeader || root.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
