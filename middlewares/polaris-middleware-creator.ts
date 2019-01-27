import {PolarisMiddleware} from "./polaris-middleware";
import {GraphQLResolveInfo} from "graphql";
import {CommonEntityInterface} from '..';


export function createMiddleware(middleware: PolarisMiddleware) {
    return async (resolve, root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo) => {
        middleware.preResolve(root, args, context, info);
        let result  = await resolve(root, args, context, info);
        middleware.postResolve(root, args, context, info, result);
        return result;
    }
}