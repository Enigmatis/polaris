import {PolarisLogger} from "@enigmatis/polaris-logs";
import {ContextLogPropertiesWrapper} from "./ContextLogPropertiesWrapper";
import {provide} from "inversify-binding-decorators";

export interface InjectableLogger {
    fatal(PolarisLogProperties);
    error(PolarisLogProperties);
    warn(PolarisLogProperties);
    info(PolarisLogProperties);
    trace(PolarisLogProperties);
    debug(PolarisLogProperties);
}

@provide("InjectableLogger")
export class GraphQLLogger extends PolarisLogger implements InjectableLogger {
    constructor() {//applicationProperties: ApplicationLogProperties, loggerLevel: string, logstashHost: string, logstashPort: number) {
        super(new ContextLogPropertiesWrapper(), null, "info", "127.0.0.1", 3000);
    }
}
