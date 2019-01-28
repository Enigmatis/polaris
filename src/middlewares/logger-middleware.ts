import { PolarisLogger, RequestLogProperty } from '@enigmatis/polaris-logs';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';
import { inject, injectable } from 'inversify';
import POLARIS_TYPES from '../inversion-of-control/polaris-types';
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
        if (!root) {
            const props: GraphqlLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(
                `Resolver of ${props.operationName}
             began execution. Arguments received: ${props.request &&
                 props.request.requestQuery &&
                 props.request.requestQuery.body}`,
                props,
            );
        } else {
            const props: GraphqlLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(`field ${info.fieldName} began execution.`, props);
        }
    }

    public postResolve(
        root: any,
        args: { [argName: string]: any },
        context: any,
        info: GraphQLResolveInfo,
        result: string,
    ) {
        if (!root) {
            const props: GraphqlLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(
                `Resolver of ${props.operationName} finished execution. Arguments received:
             ${props.request && props.request.requestQuery && props.request.requestQuery.body}`,
                props,
            );
        } else {
            const props: GraphqlLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(
                `field ${info.fieldName} finished execution. Result is: ${result}`,
                props,
            );
        }
    }

    private initReqProperties(
        root: any,
        args: any,
        context: any,
        info: GraphQLResolveInfo,
    ): GraphqlLogProperties {
        const fieldsWithSubFieldsArgs = graphqlFields(info, {}, { processArguments: true });
        const body = {} as any;
        body[info.fieldName] = fieldsWithSubFieldsArgs;
        const req: RequestLogProperty = {
            requestQuery: {
                body: JSON.stringify(body).replace(/:{}/g, ''),
            },
        };
        const prop: GraphqlLogProperties = {
            operationName: info.operation && info.operation.name && info.operation.name.value,
            request: req,
        };
        return prop;
    }
}
