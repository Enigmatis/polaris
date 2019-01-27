import {GraphQLResolveInfo} from "graphql";
import {CommonEntityInterface} from '..';

export interface PolarisMiddleware {
    preResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo);

    postResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo, result);
}