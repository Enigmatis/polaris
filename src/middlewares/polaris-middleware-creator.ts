import { GraphQLResolveInfo } from 'graphql';
import { PolarisContext, PolarisMiddleware } from './polaris-middleware';

export const createMiddleware = (middleware: PolarisMiddleware) => {
    return async (
        resolve: (
            root: any,
            args: { [argName: string]: any },
            context: PolarisContext,
            info: GraphQLResolveInfo,
        ) => string,
        root: any,
        args: { [argName: string]: any },
        context: PolarisContext,
        info: GraphQLResolveInfo,
    ) => {
        middleware.preResolve({ root, args, context, info });
        const result = await resolve(root, args, context, info);
        return middleware.postResolve({ root, args, context, info, result });
    };
};
