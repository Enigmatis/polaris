import { isRepositoryEntity } from '../dal/entities/repository-entity';
import { ResponseMiddlewareParams } from './middleware';
import { MiddlewaresConfiguration } from './middleware-activation-condition/filter-condition';
import { DataVersionFilter } from './middleware-activation-condition/filter-data-version';
import { RealityIdFilter } from './middleware-activation-condition/filter-realities';

export class FilterResolver {
    middlewaresConfig: MiddlewaresConfiguration;

    constructor(middlewaresConfig?: MiddlewaresConfiguration) {
        this.middlewaresConfig = middlewaresConfig
            ? middlewaresConfig
            : { dataVersion: true, realityId: true };
        if (this.middlewaresConfig.realityId !== false) {
            this.middlewaresConfig.realityId = true;
        }
    }

    filterResolveResult(params: ResponseMiddlewareParams): string | null {
        return params.root ? this.filterSubEntity(params) : this.arrangeDataAndFilter(params);
    }

    arrangeDataAndFilter(params: ResponseMiddlewareParams): string | null {
        const results: any = [];
        for (const entity of params.result as any) {
            results.push(entity._doc);
        }
        params.result = results;
        return this.filterEntities(params);
    }

    filterEntities(params: ResponseMiddlewareParams): string | null {
        const res: any = [];
        for (const entity of params.result as any) {
            params.result = entity;
            if (
                isRepositoryEntity(entity) &&
                (this.middlewaresConfig.dataVersion === false ||
                    DataVersionFilter.shouldBeReturned(params)) &&
                (!this.middlewaresConfig.realityId ||
                    RealityIdFilter.shouldBeReturned(params, false))
            ) {
                res.push(entity);
            }
        }
        return res;
    }

    filterSubEntity(params: ResponseMiddlewareParams): string | null {
        return !isRepositoryEntity(params.result as any) ||
            (!this.middlewaresConfig.realityId || RealityIdFilter.shouldBeReturned(params, true))
            ? params.result
            : null;
    }
}
