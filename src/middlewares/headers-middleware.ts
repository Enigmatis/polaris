import { inject, injectable } from 'inversify';
import { HeaderConfig } from '../common/injectable-interfaces';
import { isRepositoryEntity } from '../dal/entities/repository-entity';
import {
    HeadersConfiguration,
    PolarisRequestHeaders,
} from '../http/request/polaris-request-headers';
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
        headers: PolarisRequestHeaders,
        headersConfig: HeadersConfiguration,
    ) {
        return (
            !(params.root && isRepositoryEntity(params.root)) ||
            ((isNaN(headers.realityId) ||
                !headersConfig.realityId ||
                RealityIdFilter.shouldPass(params)) &&
                (isNaN(headers.dataVersion) ||
                    !headersConfig.dataVersion ||
                    DataVersionFilter.shouldPass(params)))
        );
    }
    @inject(POLARIS_TYPES.HeaderConfig) headerConfig!: HeaderConfig;

    postResolve(params: ResponseMiddlewareParams): string | null {
        return HeadersMiddleware.shouldPass(
            params,
            params.context.headers,
            this.headerConfig.getHeadersConfiguration(),
        )
            ? params.result
            : null;
    }

    preResolve(params: RequestMiddlewareParams): void {
        return;
    }
}
