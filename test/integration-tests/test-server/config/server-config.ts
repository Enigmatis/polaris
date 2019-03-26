import { ApplicationLogProperties } from '@enigmatis/polaris-logs';
import { injectable } from 'inversify';
import { PolarisProperties, PolarisServerConfig } from '../../../../src/main';
@injectable()
export class TestServerConfig implements PolarisServerConfig {
    polarisProperties: PolarisProperties;
    applicationLogProperties: ApplicationLogProperties;

    constructor() {
        this.polarisProperties = {
            endpoint: '/test',
            port: 3537,
        };
        this.applicationLogProperties = {
            id: 'polaris-test',
            name: 'polaris-test',
            repositoryVersion: '0.1',
            environment: 'test',
            component: 'compo',
        };
    }
}
