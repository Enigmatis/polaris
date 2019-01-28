import { PolarisLogger } from '@enigmatis/polaris-logs';
import * as graphqlFields from 'graphql-fields';
import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import { MiddlewareParams, PolarisMiddleware, PostMiddlewareParams } from './polaris-middleware';

@injectable()
export class LoggerMiddleware<TContext = any> implements PolarisMiddleware<TContext> {
    @inject(POLARIS_TYPES.PolarisLogger) polarisLogger!: PolarisLogger;

    preResolve({ root, args, context, info }: MiddlewareParams<TContext>) {
        if (!root) {
            const props: GraphqlLogProperties = this.initReqProperties({
                root,
                args,
                context,
                info,
            });
            this.polarisLogger.debug(
                `Resolver of ${props.operationName}
             began execution. Arguments received: ${props.request &&
                 props.request.requestQuery &&
                 props.request.requestQuery.body}`,
                props,
            );
        } else {
            const props: GraphqlLogProperties = this.initReqProperties({
                root,
                args,
                context,
                info,
            });
            this.polarisLogger.debug(`field ${info.fieldName} began execution.`, props);
        }
    }

    postResolve({ root, args, context, info, result }: PostMiddlewareParams<TContext>) {
        if (!root) {
            const props: GraphqlLogProperties = this.initReqProperties({
                root,
                args,
                context,
                info,
            });
            this.polarisLogger.debug(
                `Resolver of ${props.operationName} finished execution. Arguments received:
             ${props.request && props.request.requestQuery && props.request.requestQuery.body}`,
                props,
            );
        } else {
            const props: GraphqlLogProperties = this.initReqProperties({
                root,
                args,
                context,
                info,
            });
            this.polarisLogger.debug(
                `field ${info.fieldName} finished execution. Result is: ${result}`,
                props,
            );
        }
    }

    private initReqProperties({ info }: MiddlewareParams<TContext>): GraphqlLogProperties {
        const fieldsWithSubFieldsArgs = graphqlFields(info, {}, { processArguments: true });
        const body = {} as any;
        body[info.fieldName] = fieldsWithSubFieldsArgs;
        return {
            operationName: info.operation && info.operation.name && info.operation.name.value,
            request: {
                requestQuery: {
                    body: JSON.stringify(body).replace(/:{}/g, ''),
                },
            },
        };
    }
}
