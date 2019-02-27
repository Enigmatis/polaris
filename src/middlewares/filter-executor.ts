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
        return params.root ? this.filterSubEntity(params) : this.filterRootEntities(params);
    }

    filterRootEntities(params: ResponseMiddlewareParams): any[] {
        const repositoryEntities: any[] = [];
        const notRepositoryEntities: any[] = [];
        for (const entity of params.result as any) {
            if (isRepositoryEntity(entity._doc)) {
                repositoryEntities.push(entity._doc);
            } else {
                notRepositoryEntities.push(entity);
            }
        }
        params.result = repositoryEntities;
        return notRepositoryEntities.concat(this.filterRootRepositoryEntities(params));
    }

    shouldFilterRepositoryEntity(params: ResponseMiddlewareParams, subEntity: boolean): boolean {
        return (
            SoftDeleteFilter.shouldBeReturned(params, subEntity) &&
            (!this.middlewaresConfig.allowDataVersionMiddleware ||
                DataVersionFilter.shouldBeReturned(params, subEntity)) &&
            (!this.middlewaresConfig.allowRealityMiddleware ||
                RealityIdFilter.shouldBeReturned(params, subEntity))
        );
    }

    filterRootRepositoryEntities(params: ResponseMiddlewareParams): any[] {
        const res: any = [];
        for (const entity of params.result as any) {
            params.result = entity;
            if (this.shouldFilterRepositoryEntity(params, false)) {
                res.push(entity);
            }
        }
        return res;
    }

    filterSubEntity(params: ResponseMiddlewareParams): any {
        return !isRepositoryEntity(params) || this.shouldFilterRepositoryEntity(params, true)
            ? params.result
            : null;
    }
}
