import {ApplicationLogProperties, LogPropertiesWrapper, PolarisLogger} from "@enigmatis/polaris-logs";
import {LoggerConfiguration} from "@enigmatis/polaris-logs";
import {inject, injectable, named} from "inversify";

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
                @inject("ApplicationLogProperties") @named("GraphQLLogger") applicationLogProperties: ApplicationLogProperties,
                @inject("LoggerConfiguration") @named("GraphQLLogger") loggerConfiguration: LoggerConfiguration,
    ) {
        super(logPropertiesWrapper, applicationLogProperties, loggerConfiguration);
    }
}