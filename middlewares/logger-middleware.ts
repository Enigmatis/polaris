import {PolarisMiddleware} from "./polaris-middleware";
import {inject, injectable} from "inversify";
import {GraphQLResolveInfo} from "graphql";
import {GraphQLLogProperties} from "../logging/GraphQLLogProperties";
import POLARIS_TYPES from '../inversion-of-control/polaris-types';
import { Stopwatch } from "ts-stopwatch";
import {PolarisLogger} from '@enigmatis/polaris-logs';

@injectable()
export class LoggerMiddleware implements PolarisMiddleware {
    @inject(POLARIS_TYPES.PolarisLogger) polarisLogger: PolarisLogger;
    private stopwatch: Stopwatch;
    constructor(){
        this.stopwatch = new Stopwatch();
    }
    private buildProps( context:any): GraphQLLogProperties {
       return {
            operationName: context.body.operationName,
            request: {
                requestQuery: {
                    body: context.body.query
                }
            }
        };
    }
    preResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo) {
        let props: GraphQLLogProperties = this.buildProps(context);
        if (!root) {
            this.polarisLogger.debug( `Resolver of ${props.operationName} began execution. Query is: ${
                props.request.requestQuery.body}. Arguments given:${JSON.stringify(args)}` ,props);
        } else {
            this.polarisLogger.debug( `Field fetching of ${info.fieldName} began execution.`,props);
        }
    }

    postResolve(root:any, args:{ [argName: string]: any }, context:any, info:GraphQLResolveInfo, result) {
        let props: GraphQLLogProperties = this.buildProps(context);
        if (root){
            this.polarisLogger.debug( `Field fetching of ${info.fieldName} finished execution. Result is:${result}`,
                props);
        }
        return result;
    }

}
