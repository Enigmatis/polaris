import { SoftDeleteConfiguration } from '@enigmatis/utills';
import { isRepositoryEntity } from '../dal/entities/repository-entity';
import { PolarisContext } from '../server/polaris-context';
import { MiddlewaresConfiguration, ResponseMiddlewareParams } from './middleware';
import { DataVersionFilter } from './middleware-activation-condition/filter-data-version';
import { RealityIdFilter } from './middleware-activation-condition/filter-realities';
import { SoftDeleteFilter } from './middleware-activation-condition/filter-soft-delete';

export class FilterExecutor {
    middlewaresConfig: MiddlewaresConfiguration;

    constructor(middlewaresConfig: MiddlewaresConfiguration) {
        this.middlewaresConfig = middlewaresConfig;
    }

    executeFilters(
        params: ResponseMiddlewareParams,
        softDeleteConfiguration?: SoftDeleteConfiguration,
    ): any {
        const hasRoot: boolean = !!params.root;
        return (
            params.result &&
            (hasRoot
                ? this.filterSubEntity(params, softDeleteConfiguration)
                : this.filterRootEntities(params, softDeleteConfiguration))
        );
    }

    filterRootEntities(
        params: ResponseMiddlewareParams,
        softDeleteConfiguration?: SoftDeleteConfiguration,
    ): any[] {
        const { result } = params;
        if (Array.isArray(result)) {
            return result.filter(
                entity =>
                    !this.shouldFilterEntity(
                        {
                            context: params.context,
                            result: entity,
                        },
                        false,
                        softDeleteConfiguration,
                    ),
            );
        } else {
            return (
                this.shouldFilterEntity(
                    {
                        context: params.context,
                        result,
                    },
                    false,
                    softDeleteConfiguration,
                ) || result
            );
        }
    }

    filterSubEntity(
        params: ResponseMiddlewareParams,
        softDeleteConfiguration?: SoftDeleteConfiguration,
    ): any {
        return this.shouldFilterEntity(params, true, softDeleteConfiguration)
            ? null
            : params.result;
    }

    shouldFilterEntity(
        { context, result }: { context: PolarisContext; result: any },
        isSubEntity: boolean,
        softDeleteConfiguration?: SoftDeleteConfiguration,
    ): boolean {
        return (
            isRepositoryEntity(result) &&
            !(
                ((softDeleteConfiguration && softDeleteConfiguration.softDeleteReturnEntities) ||
                    SoftDeleteFilter.shouldBeReturned(result)) &&
                (!this.middlewaresConfig.allowDataVersionMiddleware ||
                    DataVersionFilter.shouldBeReturned({ context, result }, isSubEntity)) &&
                (!this.middlewaresConfig.allowRealityMiddleware ||
                    RealityIdFilter.shouldBeReturned({ context, result }, isSubEntity))
            )
        );
    }
}
