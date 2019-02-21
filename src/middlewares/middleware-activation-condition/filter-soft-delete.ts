import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterSoftDelete implements MiddlewareCondition {
    shouldBeReturned({ root, context, info }: ResponseMiddlewareParams): boolean {
        return !root.deleted;
    }
}

export const SoftDeleteFilter = new FilterSoftDelete();
