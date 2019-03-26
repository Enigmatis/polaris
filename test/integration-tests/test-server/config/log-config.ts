import { LoggerConfiguration } from '@enigmatis/polaris-logs';
import { injectable } from 'inversify';
import { LoggerConfig } from '../../../../src/main';
@injectable()
export class TestLogConfig implements LoggerConfig {
    loggerConfiguration: LoggerConfiguration;

    constructor() {
        this.loggerConfiguration = {
            loggerLevel: 'debug',
            logstashConfiguration: { logstashHost: '127.0.0.1', logstashPort: 1234 },
            writeToConsole: true,
        };
    }
}
