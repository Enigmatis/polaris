import { isRepositoryEntity } from '../dal/entities/repository-entity';
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
        const hasRoot: boolean = params.root ? true : false;
        return params.result
            ? hasRoot
                ? this.filterSubEntity(params)
                : this.filterRootEntities(params)
            : null;
    }

    filterRootEntities(params: ResponseMiddlewareParams): any[] {
        const entities: any[] = params.result;
        for (let i = 0; i < entities.length; i++) {
            params.result = entities[i]._doc;
            if (this.shouldFilterEntity(params, false)) {
                entities.splice(i, 1);
            }
        }
        return entities;
    }

    filterSubEntity(params: ResponseMiddlewareParams): any {
        return this.shouldFilterEntity(params, true) ? null : params.result;
    }

    shouldFilterEntity(params: ResponseMiddlewareParams, isSubEntity: boolean): boolean {
        return (
            isRepositoryEntity(params.result) &&
            !(
                SoftDeleteFilter.shouldBeReturned(params) &&
                (!this.middlewaresConfig.allowDataVersionMiddleware ||
                    DataVersionFilter.shouldBeReturned(params, isSubEntity)) &&
                (!this.middlewaresConfig.allowRealityMiddleware ||
                    RealityIdFilter.shouldBeReturned(params, isSubEntity))
            )
        );
    }
}
