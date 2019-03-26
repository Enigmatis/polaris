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
        return hasRoot ? this.filterSubEntity(params) : this.filterRootEntities(params);
    }

    filterRootEntities(params: ResponseMiddlewareParams): any[] {
        const entities: any[] = params.result;
        const newEntities: any[] = [];
        for (const entity of entities) {
            params.result = entity._doc;
            if (isRepositoryEntity(params.result)) {
                if (!this.shouldFilterEntity(params, false)) {
                    newEntities.push(entity._doc);
                } else {
                    newEntities.push(entity);
                }
            }
        }
        return newEntities;
    }

    filterSubEntity(params: ResponseMiddlewareParams): any {
        return isRepositoryEntity(params.result) && this.shouldFilterEntity(params, true)
            ? null
            : params.result;
    }

    shouldFilterEntity(params: ResponseMiddlewareParams, isSubEntity: boolean): boolean {
        return !(
            SoftDeleteFilter.shouldBeReturned(params) &&
            (!this.middlewaresConfig.allowDataVersionMiddleware ||
                DataVersionFilter.shouldBeReturned(params, isSubEntity)) &&
            (!this.middlewaresConfig.allowRealityMiddleware ||
                RealityIdFilter.shouldBeReturned(params, isSubEntity))
        );
    }
}
