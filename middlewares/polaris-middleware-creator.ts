import {PolarisMiddleware} from "./polaris-middleware";

export function createMiddleware(middleware: PolarisMiddleware) {
    return async (resolve, root, args, context, info) => {
        middleware.preResolve(resolve, root, args, context, info);
        const result = await resolve(root, args, context, info);
        middleware.postResolve(root, args, context, info, result);
        return result;
    }
}