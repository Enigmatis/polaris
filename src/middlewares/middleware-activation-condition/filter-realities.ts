import { GraphQLResolveInfo } from 'graphql';
import { PolarisRequestHeaders } from '../../http/request/polaris-request-headers';
import { MiddlewareCondition, ResponseMiddlewareParams } from '../polaris-middleware';

class FilterRealities implements MiddlewareCondition {
    private static isSubEntity(info: GraphQLResolveInfo) {
        let path: any = info.path;
        let level = 0;
        while (path.prev) {
            path = path.prev;
            level++;
        }
        return level >= 3; // query, referenced entity, referenced entity property
    }

    shouldPass({ root, context, info }: ResponseMiddlewareParams): boolean {
        const headers: PolarisRequestHeaders = context.headers;
        const subEntity: boolean = FilterRealities.isSubEntity(info);
        const matchingRealities = root.realityId === headers.realityId;
        return (
            !headers.realityId ||
            matchingRealities ||
            (subEntity && headers.includeLinkedOperation === true && root.realityId === '0')
        );
    }
}

export const RealityIdFilter = new FilterRealities();
