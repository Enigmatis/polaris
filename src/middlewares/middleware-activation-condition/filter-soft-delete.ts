import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterSoftDelete implements MiddlewareCondition {
    shouldBeReturned(
        { root, context, info, result }: ResponseMiddlewareParams,
        subEntity?: boolean,
    ): boolean {
        return subEntity ? !root.deleted : !result.deleted;
    }
}

export const SoftDeleteFilter = new FilterSoftDelete();
