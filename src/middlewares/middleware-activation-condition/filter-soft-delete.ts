import { MiddlewareCondition } from './filter-condition';

class FilterSoftDelete implements MiddlewareCondition {
    shouldBeReturned(result: any): boolean {
        return result && !result.deleted;
    }
}

export const SoftDeleteFilter = new FilterSoftDelete();
