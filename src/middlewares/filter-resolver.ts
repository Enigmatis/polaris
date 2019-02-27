import { isRepositoryEntity } from '../dal/entities/repository-entity';
import { MiddlewaresConfiguration, ResponseMiddlewareParams } from './middleware';
import { DataVersionFilter } from './middleware-activation-condition/filter-data-version';
import { RealityIdFilter } from './middleware-activation-condition/filter-realities';
import { SoftDeleteFilter } from './middleware-activation-condition/filter-soft-delete';

export class FilterResolver {
    middlewaresConfig: MiddlewaresConfiguration;

    constructor(middlewaresConfig?: MiddlewaresConfiguration) {
        this.middlewaresConfig = middlewaresConfig
            ? middlewaresConfig
            : { allowDataVersionMiddleware: true, allowRealityMiddleware: true };
        if (this.middlewaresConfig.allowRealityMiddleware !== false) {
            this.middlewaresConfig.allowRealityMiddleware = true;
        }
    }

    filterResolveResult(params: ResponseMiddlewareParams): any {
        return params.root ? this.filterSubEntity(params) : this.arrangeDataAndFilter(params);
    }

    arrangeDataAndFilter(params: ResponseMiddlewareParams): any {
        const results: any = [];
        for (const entity of params.result as any) {
            results.push(entity._doc);
        }
        params.result = results;
        return this.filterEntities(params);
    }

    filterEntities(params: ResponseMiddlewareParams): any {
        const res: any = [];
        for (const entity of params.result as any) {
            params.result = entity;
            if (
                isRepositoryEntity(entity) &&
                SoftDeleteFilter.shouldBeReturned(params, false) &&
                (this.middlewaresConfig.allowDataVersionMiddleware === false ||
                    DataVersionFilter.shouldBeReturned(params)) &&
                (!this.middlewaresConfig.allowRealityMiddleware ||
                    RealityIdFilter.shouldBeReturned(params, false))
            ) {
                res.push(entity);
            }
        }
        return res;
    }

    filterSubEntity(params: ResponseMiddlewareParams): any{
        return !isRepositoryEntity(params.result as any) ||
            (SoftDeleteFilter.shouldBeReturned(params, true) &&
                (!this.middlewaresConfig.allowRealityMiddleware ||
                    RealityIdFilter.shouldBeReturned(params, true)))
            ? params.result
            : null;
    }
}
