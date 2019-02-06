import { PolarisRequestHeaders } from '../../http/request/polaris-request-headers';
import { ResponseMiddlewareParams } from '../middleware';
import {isSubEntity, MiddlewareCondition} from "./filter-condition";

class FilterRealities implements MiddlewareCondition {

    shouldBeReturned({ root, context, info }: ResponseMiddlewareParams): boolean {
        const headers: PolarisRequestHeaders = context.headers;
        const isMatchingRealities: boolean = root.realityId === headers.realityId;
        return (
            !headers.realityId ||
            isMatchingRealities ||
            (isSubEntity(info) && headers.includeLinkedOperation === true && root.realityId === '0')
        );
    }
}

export const RealityIdFilter = new FilterRealities();
