import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import { GraphqlLogger } from '../logging/graphql-logger';
import { PolarisContext } from '../server/polaris-context';
import {
    PolarisMiddleware,
    RequestMiddlewareParams,
    ResponseMiddlewareParams,
} from './polaris-middleware';

@injectable()
export class LoggerMiddleware<TContext extends PolarisContext = PolarisContext>
    implements PolarisMiddleware<TContext> {
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

    @inject(POLARIS_TYPES.GraphqlLogger) polarisLogger!: GraphqlLogger;

    preResolve({ root, args, context, info }: RequestMiddlewareParams<TContext>) {
        const props: GraphqlLogProperties = LoggerMiddleware.buildProps(context);
        if (!root) {
            this.polarisLogger.debug(
                `Resolver of ${props.operationName} began execution. Action is:
                    \n${context.body.query}Arguments given:${JSON.stringify(args)}`,
                {
                    context,
                    polarisLogProperties: props,
                },
            );
        } else {
            this.polarisLogger.debug(`field fetching of ${info.fieldName} began execution.`, {
                context,
                polarisLogProperties: props,
            });
        }
    }

    postResolve({
        root,
        context,
        info,
        result,
    }: ResponseMiddlewareParams<TContext>): string | null {
        if (!root) {
            const props: GraphqlLogProperties = LoggerMiddleware.buildProps(context);
            this.polarisLogger.debug(
                `Field fetching of ${info.fieldName} finished execution. Result is: ${result}`,
                {
                    context,
                    polarisLogProperties: props,
                },
            );
        }
        return result;
    }
}
