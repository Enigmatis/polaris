import {GraphQLResolveInfo} from "graphql";

export interface PolarisMiddleware {
    preResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo);

    postResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo, result:string);
}