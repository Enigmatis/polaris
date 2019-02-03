import { PolarisLogger } from '@enigmatis/polaris-logs';
import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import {
    PolarisMiddleware,
    RequestMiddlewareParams,
    ResponseMiddlewareParams,
} from './polaris-middleware';

@injectable()
export class LoggerMiddleware implements PolarisMiddleware {
    static buildProps(context: any): GraphqlLogProperties {
        return {
            operationName: context.body.operationName,
            request: {
                requestQuery: {
                    body: context.body.query,
                },
            },
        };
    }

    @inject(POLARIS_TYPES.PolarisLogger) polarisLogger!: PolarisLogger;

    preResolve({ root, args, context, info }: RequestMiddlewareParams) {
        const props: GraphqlLogProperties = LoggerMiddleware.buildProps(context);
        if (!root) {
            this.polarisLogger.debug(
                `Resolver of ${props.operationName} began execution. Action is:
                    \n${context.body.query}Arguments given:${JSON.stringify(args)}`,
                props,
            );
        } else {
            this.polarisLogger.debug(`field fetching of ${info.fieldName} began execution.`, props);
        }
    }

    postResolve({ root, context, info, result }: ResponseMiddlewareParams): string | null {
        if (!root) {
            const props: GraphqlLogProperties = LoggerMiddleware.buildProps(context);
            this.polarisLogger.debug(
                `Field fetching of ${info.fieldName} finished execution. Result is: ${result}`,
                props,
            );
        }
        return result;
    }
}
