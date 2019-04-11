import { PolarisRequestHeaders } from '@enigmatis/utills';
import { PolarisContext } from '../../server/polaris-context';
import { ResponseMiddlewareParams } from '../middleware';
import { MiddlewareCondition } from './filter-condition';

class FilterRealities implements MiddlewareCondition {
    shouldBeReturned(
        { context, result }: { context: PolarisContext; result: any },
        isSubEntity: boolean,
    ): boolean {
        const operationalRealityId: number = 0;
        const headers: PolarisRequestHeaders = context.headers;
        const realityIdHeaderExists: any = headers.realityId === 0 ? true : headers.realityId;
        const isMatchingRealities: boolean = result.realityId === headers.realityId;
        return (
            !realityIdHeaderExists ||
            isMatchingRealities ||
            (isSubEntity &&
                headers.includeLinkedOperation === true &&
                result.realityId === operationalRealityId)
        );
    }
}

export const RealityIdFilter = new FilterRealities();
