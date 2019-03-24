import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterSoftDelete implements MiddlewareCondition {
    shouldBeReturned({ result }: ResponseMiddlewareParams): boolean {
        if (!result) {
            return false;
        }
        return !result.deleted;
    }
}

export const SoftDeleteFilter = new FilterSoftDelete();
