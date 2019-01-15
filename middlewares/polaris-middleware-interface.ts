export interface PolarisMiddlewareInterface {
    preResolve(resolve, root, args, context, info);

    postResolve(root, args, context, info, result);
}