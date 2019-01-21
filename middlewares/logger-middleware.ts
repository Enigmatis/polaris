import {PolarisMiddleware} from "./polaris-middleware";
import {inject, injectable} from "inversify";
import {PolarisLogger} from "@enigmatis/polaris-logs/dist/src/polaris-logger";
import {InjectableLogger} from "..";
import {GraphQLResolveInfo} from "graphql";
import {GraphQLLogProperties} from "../logging/GraphQLLogProperties";
import {RequestLogProperty} from "@enigmatis/polaris-logs/dist/src/entities/request-log-property";
import {PolarisLogProperties} from "@enigmatis/polaris-logs/dist/src/polaris-log-properties";
import POLARIS_TYPES from '../inversion-of-control/polaris-types';

const graphqlFields = require('graphql-fields');

@injectable()
export class LoggerMiddleware implements PolarisMiddleware {
    @inject(POLARIS_TYPES.InjectableLogger) polarisLogger: InjectableLogger;

    private initReqProperties(root, args, context, info: GraphQLResolveInfo): GraphQLLogProperties {
        let fieldsWithSubFieldsArgs = graphqlFields(info, {}, {processArguments: true});
        let body = {}
        body[info.fieldName] = fieldsWithSubFieldsArgs;
        let req: RequestLogProperty = {
            requestQuery: {
                body: JSON.stringify(body).replace(/:{}/g, "")
            }
        };
        let prop: GraphQLLogProperties = {
            operationName: info.operation.name.value,
            request: req
        };
        return prop;
    }

    preResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo) {
        if (!root) {
            let props: GraphQLLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug( `Resolver of ${props.operationName}
             began execution. Arguments received: ${props.request.requestQuery.body}` ,props);
        } else {
            let props: GraphQLLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(`field ${info.fieldName} began execution.`, props);
        }
    }

    postResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo, result:string) {
        if (!root) {
            let props: GraphQLLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(`Resolver of ${props.operationName} finished execution. Arguments received:
             ${props.request.requestQuery.body}`, props);
        } else {
            let props: GraphQLLogProperties = this.initReqProperties(root, args, context, info);
            this.polarisLogger.debug(`field ${info.fieldName} finished execution. Result is: ${result}`, props);
        }
    }
}
