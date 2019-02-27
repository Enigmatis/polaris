import { GraphqlLogger } from '@enigmatis/utills';
import { inject, injectable } from 'inversify';
import { MiddlewaresConfig } from '../common/injectable-interfaces';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import { PolarisContext } from '../server/polaris-context';
import { FilterResolver } from './filter-resolver';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';

@injectable()
export class PolarisMiddleware implements Middleware {
    @inject(POLARIS_TYPES.GraphqlLogger) polarisLogger!: GraphqlLogger<PolarisContext>;
    filterResolver: FilterResolver;

    constructor(@inject(POLARIS_TYPES.MiddlewaresConfig) middlewaresConfig: MiddlewaresConfig) {
        this.filterResolver = new FilterResolver(middlewaresConfig.middlewaresConfiguration);
    }

    preResolve({ root, info, context, args }: RequestMiddlewareParams): void {
        const polarisLogProperties: GraphqlLogProperties = this.buildProps(context);
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

    postResolve(params: ResponseMiddlewareParams): any {
        const resolveResult =
            params.info.operation.operation === 'query'
                ? this.filterResolver.filterResolveResult(params)
                : params.result;
        this.logEndOfResolve(params);
        return resolveResult;
    }

    logEndOfResolve({ root, args, info, context, result }: ResponseMiddlewareParams) {
        const polarisLogProperties: GraphqlLogProperties = this.buildProps(context);
        const msg = `Field fetching of ${info.fieldName} finished execution. Result is: ${result}`;
        this.polarisLogger.debug(msg, { context, polarisLogProperties });
    }

    buildProps(context: any): GraphqlLogProperties {
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
