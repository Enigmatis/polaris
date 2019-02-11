import { PolarisRequestHeaders } from '../../http/request/polaris-request-headers';
import { ResponseMiddlewareParams } from '../middleware';
import { isSubEntity, MiddlewareCondition } from './filter-condition';

class FilterRealities implements MiddlewareCondition {
    shouldBeReturned({ root, context, info }: ResponseMiddlewareParams): boolean {
        const operationalRealityId: string = '0';
        const headers: PolarisRequestHeaders = context.headers;
        const isMatchingRealities: boolean = root.realityId === headers.realityId;
        return (
            !headers.realityId ||
            isMatchingRealities ||
            (isSubEntity(info) &&
                headers.includeLinkedOperation === true &&
                root.realityId === operationalRealityId)
        );
    }
}
export const RealityIdFilter = new FilterRealities();
