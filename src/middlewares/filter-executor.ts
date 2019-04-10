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

    executeFilters(params: ResponseMiddlewareParams): any {
        const hasRoot: boolean = !!params.root;
        return hasRoot ? this.filterSubEntity(params) : this.filterRootEntities(params);
    }

    filterRootEntities(params: ResponseMiddlewareParams): any[] {
        const { result } = params;
        if (Array.isArray(result)) {
            return result.filter(
                entity =>
                    !this.shouldFilterEntity(
                        {
                            context: params.context,
                            result: entity._doc,
                        },
                        false,
                    ),
            );
        } else {
            return this.shouldFilterEntity(result._doc, false) || result._doc;
        }
    }

    filterSubEntity(params: ResponseMiddlewareParams): any {
        return this.shouldFilterEntity(params, true) ? null : params.result;
    }

    shouldFilterEntity(
        { context, result }: { context: PolarisContext; result: any },
        isSubEntity: boolean,
    ): boolean {
        return (
            isRepositoryEntity(result) &&
            !(
                SoftDeleteFilter.shouldBeReturned(result) &&
                (!this.middlewaresConfig.allowDataVersionMiddleware ||
                    DataVersionFilter.shouldBeReturned({ context, result }, isSubEntity)) &&
                (!this.middlewaresConfig.allowRealityMiddleware ||
                    RealityIdFilter.shouldBeReturned({ context, result }, isSubEntity))
            )
        );
    }
}
