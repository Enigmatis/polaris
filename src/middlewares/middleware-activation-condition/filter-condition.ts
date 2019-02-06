import { GraphQLResolveInfo } from 'graphql';
import { ResponseMiddlewareParams } from '../middleware';

export interface MiddlewareCondition {
    shouldBeReturned(params: ResponseMiddlewareParams): boolean;
}

export function isSubEntity(info: GraphQLResolveInfo): boolean {
    const minLevelToSubEntity = 3; // query, referenced entity, referenced entity property
    let path: any = info.path;
    let level = 0;
    while (path.prev) {
        path = path.prev;
        level++;
    }
    return level >= minLevelToSubEntity;
}
