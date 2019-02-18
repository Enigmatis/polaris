import { ResponseMiddlewareParams } from '../middleware';
import { isSubEntity, MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned({ root, context, info }: ResponseMiddlewareParams): boolean {
        const dataVersionHeader = context.headers.dataVersion;
        return (
            !dataVersionHeader ||
            (!isSubEntity(info) && root.allowDataVersionMiddleware > dataVersionHeader)
        );
    }
}

export const DataVersionFilter = new FilterDataVersion();
