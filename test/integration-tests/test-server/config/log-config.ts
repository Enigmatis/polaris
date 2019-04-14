import { LoggerConfiguration } from '@enigmatis/polaris-logs';
import { injectable } from 'inversify';
import { LoggerConfig } from '../../../../src/main';
import * as polarisLogConfigurationPath from './log-configuration.json';

@injectable()
export class TestLogConfig implements LoggerConfig {
    loggerConfiguration: LoggerConfiguration;

    constructor() {
        this.loggerConfiguration = {
            loggerLevel: polarisLogConfigurationPath.loggerLevel,
            logstashConfigurations: polarisLogConfigurationPath.logstashConfigurations,
            writeToConsole: polarisLogConfigurationPath.writeToConsole,
            writeFullMessageToConsole: polarisLogConfigurationPath.writeFullMessageToConsole,
            timezone:  polarisLogConfigurationPath.timezone,
        };
    }
}
