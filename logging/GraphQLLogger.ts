import {PolarisLogger, PolarisLogProperties} from "@enigmatis/polaris-logs";
import {inject, injectable} from "inversify";
import {ILogConfig, IPolarisServerConfig} from "..";
import POLARIS_TYPES from '../inversion-of-control/polaris-types';

export interface InjectableLogger {
    fatal(message: string, polarisLogProperties?: PolarisLogProperties);
    error(message: string, polarisLogProperties?: PolarisLogProperties);
    warn(message: string, polarisLogProperties?: PolarisLogProperties);
    info(message: string, polarisLogProperties?: PolarisLogProperties);
    trace(message: string, polarisLogProperties?: PolarisLogProperties);
    debug(message: string, polarisLogProperties?: PolarisLogProperties);
}

@injectable()
export class GraphQLLogger extends PolarisLogger {
    constructor(@inject(POLARIS_TYPES.ILogConfig) logConfig: ILogConfig,
                @inject(POLARIS_TYPES.IPolarisServerConfig) propertiesConfig: IPolarisServerConfig
    ) {
        super(propertiesConfig.getApplicationLogProperties(), logConfig.getLogConfiguration());
    }
}