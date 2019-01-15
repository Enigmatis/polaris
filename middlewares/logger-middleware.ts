import {PolarisMiddleware} from "./polaris-middleware";
import {inject, injectable} from "inversify";
import {PolarisLogger} from "@enigmatis/polaris-logs/dist/src/polaris-logger";
import {InjectableLogger} from "..";

@injectable()
export class LoggerMiddleware implements PolarisMiddleware {
    @inject("InjectableLogger") polarisLogger: InjectableLogger;

    preResolve(resolve, root, args, context, info) {
        this.polarisLogger.info(`before resolver, args: ${JSON.stringify(args)}`);
    }

    postResolve(root: any, args: any, context: any, info: any, result) {
        this.polarisLogger.info(`after resolver, result: ${JSON.stringify(result)}`);
    }
}