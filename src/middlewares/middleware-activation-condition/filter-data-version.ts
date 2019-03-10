import { IrrelevantEntitiesContainer } from '../irrelevant-entities';
import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned({ context, result }: ResponseMiddlewareParams, isSubEntity: boolean): boolean {
        const dataVersionHeader = context.headers.dataVersion;

        if (dataVersionHeader && !isSubEntity && result.dataVersion <= dataVersionHeader) {
            if (result._id) {
                IrrelevantEntitiesContainer.getIrrelevant().push(result._id.toString());
            }
        }

        return !dataVersionHeader || isSubEntity || result.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
