import {ResponseMiddlewareParams} from '../middleware';
import {isSubEntity, MiddlewareCondition} from "./filter-condition";

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned({root, context, info}: ResponseMiddlewareParams): boolean {
        const dataVersionHeader: number | undefined = context.headers.dataVersion;
        return !dataVersionHeader || ((!isSubEntity(info)) && (root.dataVersion > dataVersionHeader));
    }
}

export const DataVersionFilter = new FilterDataVersion();
