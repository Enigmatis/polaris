export interface PolarisMiddleware {
    preResolve(resolve, root, args, context, info);

    postResolve(root, args, context, info, result);
}