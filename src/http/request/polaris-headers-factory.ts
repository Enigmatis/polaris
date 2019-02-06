import { PolarisLogger } from '@enigmatis/polaris-logs';
import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../../inversion-of-control/polaris-types';
import { PolarisRequestHeaders } from './polaris-request-headers';

@injectable()
export class PolarisHeadersFactory {
    @inject(POLARIS_TYPES.GraphqlLogger) polarisLogger!: PolarisLogger;

    createHeaders(headers: any): PolarisRequestHeaders {
        const headersValue: PolarisRequestHeaders = new PolarisRequestHeaders(headers);
        const err = headersValue.validate();
        if (err) {
            this.polarisLogger.error(`creating headers error:${err}`);
        }
        return headersValue;
    }
}
