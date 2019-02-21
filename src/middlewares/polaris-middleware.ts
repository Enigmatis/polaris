import { GraphqlLogger } from '@enigmatis/utills';
import { inject, injectable } from 'inversify';
import { MiddlewaresConfig } from '../common/injectable-interfaces';
import { isRepositoryEntity } from '../dal/entities/repository-entity';
import { MiddlewaresConfiguration } from '../http/request/polaris-request-headers';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { GraphqlLogProperties } from '../logging/graphql-log-properties';
import { PolarisContext } from '../server/polaris-context';
import { Middleware, RequestMiddlewareParams, ResponseMiddlewareParams } from './middleware';
import { DataVersionFilter } from './middleware-activation-condition/filter-data-version';
import { RealityIdFilter } from './middleware-activation-condition/filter-realities';
import { SoftDeleteFilter } from './middleware-activation-condition/filter-soft-delete';

@injectable()
export class PolarisMiddleware implements Middleware {
    @inject(POLARIS_TYPES.GraphqlLogger) polarisLogger!: GraphqlLogger<PolarisContext>;
    middlewaresConfig: MiddlewaresConfiguration;

    constructor(@inject(POLARIS_TYPES.MiddlewaresConfig) middlewaresConfig: MiddlewaresConfig) {
        this.middlewaresConfig = middlewaresConfig.middlewaresConfiguration;
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

    postResolve({ root, args, context, info, result }: ResponseMiddlewareParams): string | null {
        const resolveResult: string | null = this.shouldBeReturned(
            {
                root,
                args,
                context,
                info,
                result,
            },
            this.middlewaresConfig,
        )
            ? result
            : null;
        const polarisLogProperties: GraphqlLogProperties = this.buildProps(context);
        const msg = `Field fetching of ${info.fieldName} finished execution. Result is: ${result}`;
        this.polarisLogger.debug(msg, { context, polarisLogProperties });
        return resolveResult;
    }

    shouldBeReturned(
        params: ResponseMiddlewareParams,
        middlewaresConfig: MiddlewaresConfiguration,
    ) {
        return (
            !(params.root && isRepositoryEntity(params.root)) ||
            (SoftDeleteFilter.shouldBeReturned(params) &&
                ((middlewaresConfig.allowRealityMiddleware === false ||
                    RealityIdFilter.shouldBeReturned(params)) &&
                    (middlewaresConfig.allowDataVersionMiddleware === false ||
                        DataVersionFilter.shouldBeReturned(params))))
        );
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
