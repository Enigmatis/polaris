import { PolarisLogger } from '@enigmatis/polaris-logs';
import { GraphQLResolveInfo } from 'graphql';
import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import { PolarisMiddleware } from './polaris-middleware';

@injectable()
export class LoggerMiddleware implements PolarisMiddleware {
    @inject(POLARIS_TYPES.PolarisLogger) public polarisLogger!: PolarisLogger;

    public preResolve(
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
    ) {
        const props: GraphqlLogProperties = this.buildProps(context);
        if (!root) {
            this.polarisLogger.debug(
                `Resolver of ${props.operationName}
             began execution. Query is: ${context.body.query}. Arguments given:${JSON.stringify(
                    args,
                )}`,
                props,
            );
        } else {
            this.polarisLogger.debug(`field fetching of ${info.fieldName} began execution.`, props);
        }
    }

    public postResolve(
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
        result: string,
    ) {
        const props: GraphqlLogProperties = this.buildProps(context);
        if (root) {
            this.polarisLogger.debug(
                `Field fetching of ${info.fieldName} finished execution. Result is:${result}`,
                props,
            );
        }
        return result;
    }

    private buildProps(context: any): GraphqlLogProperties {
        return {
            operationName: context.body.operationName,
            request: {
                requestQuery: {
                    body: context.body.query,
                },
            },
        };
    }
}
