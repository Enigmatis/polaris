import { GraphqlLogger, SoftDeleteConfiguration } from '@enigmatis/utills';
import { inject, injectable } from 'inversify';
import { MiddlewaresConfig } from '../common/injectable-interfaces';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphQLLogProperties } from '../logging/graphql-log-properties';
import { PolarisContext } from '../server/polaris-context';
import { FilterExecutor } from './filter-executor';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class PolarisMiddleware implements Middleware {
    @inject(POLARIS_TYPES.GraphQLLogger) polarisLogger!: GraphqlLogger<PolarisContext>;
    @inject(POLARIS_TYPES.SoftDeleteConfiguration) softDeleteConfiguration:
        | SoftDeleteConfiguration
        | undefined;
    filterExecutor: FilterExecutor;

    constructor(@inject(POLARIS_TYPES.MiddlewaresConfig) middlewaresConfig: MiddlewaresConfig) {
        this.filterExecutor = new FilterExecutor(middlewaresConfig.middlewaresConfiguration);
    }

    preResolve(params: RequestMiddlewareParams): void {
        this.logStartOfResolve(params);
    }

    postResolve(params: ResponseMiddlewareParams): any {
        const resolveResult =
            params.info.operation.operation === 'query'
                ? this.filterExecutor.executeFilters(params, this.softDeleteConfiguration)
                : params.result;
        this.logEndOfResolve(params);
        return resolveResult;
    }

    logStartOfResolve({ root, context, args, info }: RequestMiddlewareParams): void {
        const polarisLogProperties: GraphQLLogProperties = this.buildProps(context);
        if (!root) {
            const startMsg = `Resolver of ${
                polarisLogProperties.operationName
            } began execution. Action is:
                    \n${context.body.query}\nArguments given:${JSON.stringify(args)}`;
            this.polarisLogger.info(startMsg, { context, polarisLogProperties });
        }
        const msg = `field fetching of ${info.fieldName} began execution.`;
        this.polarisLogger.debug(msg, { context, polarisLogProperties });
    }

    logEndOfResolve({ root, args, info, context, result }: ResponseMiddlewareParams): void {
        const polarisLogProperties: GraphQLLogProperties = this.buildProps(context);
        const msg = `Field fetching of ${info.fieldName} finished execution. Result is: ${result}`;
        this.polarisLogger.debug(msg, { context, polarisLogProperties });
    }

    buildProps(context: any): GraphQLLogProperties {
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
