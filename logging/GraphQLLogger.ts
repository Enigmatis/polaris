import {LogPropertiesWrapper, PolarisLogger} from "@enigmatis/polaris-logs";
import {inject, injectable, named} from "inversify";
import {ILogConfig, IPolarisServerConfig} from "..";

export interface InjectableLogger {
    fatal(PolarisLogProperties);
    error(PolarisLogProperties);
    warn(PolarisLogProperties);
    info(PolarisLogProperties);
    trace(PolarisLogProperties);
    debug(PolarisLogProperties);
}

@injectable()
export class GraphQLLogger extends PolarisLogger {
    constructor(@inject("LogPropertiesWrapper") @named("GraphQLLogger") logPropertiesWrapper: LogPropertiesWrapper,
                @inject("ILogConfig") logConfig: ILogConfig,
                @inject("IPolarisServerConfig") propertiesConfig: IPolarisServerConfig
    ) {
        super(logPropertiesWrapper, propertiesConfig.getApplicationLogProperties(), logConfig.getLogConfiguration());
    }
}