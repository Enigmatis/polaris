import { ApplicationLogProperties } from '@enigmatis/polaris-logs';
import { injectable } from 'inversify';
import { PolarisProperties, PolarisServerConfig } from '../../../../src/main';
import * as polarisPropertiesPath from './properties.json';

@injectable()
export class TestServerConfig implements PolarisServerConfig {
    polarisProperties: PolarisProperties;
    applicationLogProperties: ApplicationLogProperties;

    constructor() {
        this.polarisProperties = {
            endpoint: polarisPropertiesPath.endpoint,
            port: polarisPropertiesPath.port,
            includeSubscription: polarisPropertiesPath.includeSubscription,
        };
        this.applicationLogProperties = {
            id: polarisPropertiesPath.applicationId,
            name: polarisPropertiesPath.applicationName,
            repositoryVersion: polarisPropertiesPath.repositoryVersion,
            environment: polarisPropertiesPath.environment,
            component: polarisPropertiesPath.component,
        };
    }
}
