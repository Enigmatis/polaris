import {PolarisMiddlewareInterface} from "./polaris-middleware-interface";

export class LoggerMiddleware implements PolarisMiddlewareInterface{
    preResolve(resolve, root, args, context, info) {
        console.log(`before resolver, args: ${JSON.stringify(args)}`);
    }

    postResolve(root: any, args: any, context: any, info: any, result) {
        console.log(`after resolver, result: ${JSON.stringify(result)}`);
    }
}