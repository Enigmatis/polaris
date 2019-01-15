import {PolarisMiddlewareInterface} from "./polaris-middleware-interface";

export function createMiddleware(middleware: PolarisMiddlewareInterface) {
    return async (resolve, root, args, context, info) => {
        middleware.preResolve(resolve, root, args, context, info);
        const result = await resolve(root, args, context, info);
        middleware.postResolve(root, args, context, info, result);
        return result;
    }
}