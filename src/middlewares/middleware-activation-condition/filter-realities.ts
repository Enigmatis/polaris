import { PolarisRequestHeaders } from '../../http/request/polaris-request-headers';
import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterRealities implements MiddlewareCondition {
    shouldBeReturned(
        { root, context, info, result }: ResponseMiddlewareParams,
        subEntity: boolean,
    ): boolean {
        const operationalRealityId: number = 0;
        const headers: PolarisRequestHeaders = context.headers;
        const realityIdHeaderExists: any = headers.realityId === 0 ? true : headers.realityId;
        const isMatchingRealities: boolean = subEntity
            ? root.realityId === headers.realityId
            : result.realityId === headers.realityId;
        return (
            !realityIdHeaderExists ||
            isMatchingRealities ||
            (subEntity &&
                headers.includeLinkedOperation === true &&
                root.realityId === operationalRealityId)
        );
    }
}

export const RealityIdFilter = new FilterRealities();
