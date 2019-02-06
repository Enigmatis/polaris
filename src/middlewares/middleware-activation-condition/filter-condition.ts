import {GraphQLResolveInfo} from "graphql";
import {ResponseMiddlewareParams} from "../middleware";


export interface MiddlewareCondition {
    shouldBeReturned(params: ResponseMiddlewareParams): boolean;
}

export function isSubEntity(info: GraphQLResolveInfo) : boolean {
    let path: any = info.path;
    let level = 0;
    while (path.prev) {
        path = path.prev;
        level++;
    }
    return level >= 3; // query, referenced entity, referenced entity property
}
