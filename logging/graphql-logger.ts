import { PolarisLogger } from '@enigmatis/polaris-logs';
import { inject, injectable } from 'inversify';
import { LogConfig, PolarisServerConfig } from '../common/injectable-interfaces';
import POLARIS_TYPES from '../inversion-of-control/polaris-types';

@injectable()
export class GraphqlLogger extends PolarisLogger {
    constructor(
        @inject(POLARIS_TYPES.LogConfig) logConfig: LogConfig,
        @inject(POLARIS_TYPES.PolarisServerConfig) propertiesConfig: PolarisServerConfig,
    ) {
        super(propertiesConfig.getApplicationLogProperties(), logConfig.getLogConfiguration());
    }
}
