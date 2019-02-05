import { inject, injectable } from 'inversify';
import { HeaderConfig } from '../common/injectable-interfaces';
import { isRepositoryEntity } from '../dal/entities/repository-entity';
import { HeadersConfiguration } from '../http/request/polaris-request-headers';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { DataVersionFilter } from './middleware-activation-condition/filter-data-version';
import { RealityIdFilter } from './middleware-activation-condition/filter-realities';
import {
    PolarisMiddleware,
    RequestMiddlewareParams,
    ResponseMiddlewareParams,
} from './polaris-middleware';

@injectable()
export class HeadersMiddleware implements PolarisMiddleware {
    private static shouldPass(
        params: ResponseMiddlewareParams,
        headersConfig: HeadersConfiguration,
    ) {
        return (
            !(params.root && isRepositoryEntity(params.root)) ||
            ((headersConfig.realityId === false || RealityIdFilter.shouldPass(params)) &&
                (headersConfig.dataVersion === false || DataVersionFilter.shouldPass(params)))
        );
    }

    headersConfiguration: HeadersConfiguration;

    constructor(@inject(POLARIS_TYPES.HeaderConfig) headerConfig: HeaderConfig) {
        this.headersConfiguration = headerConfig.headersConfiguration;
    }

    postResolve(params: ResponseMiddlewareParams): string | null {
        return HeadersMiddleware.shouldPass(params, this.headersConfiguration)
            ? params.result
            : null;
    }

    preResolve(params: RequestMiddlewareParams): void {
        return;
    }
}
