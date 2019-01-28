import { GraphQLResolveInfo } from 'graphql';
import { PolarisMiddleware } from './polaris-middleware';

export function createMiddleware(middleware: PolarisMiddleware) {
    return async (
        resolve: any,
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
    ) => {
        middleware.preResolve(root, args, context, info);
        const result = await resolve(root, args, context, info);
        middleware.postResolve(root, args, context, info, result);
        return result;
    };
}
