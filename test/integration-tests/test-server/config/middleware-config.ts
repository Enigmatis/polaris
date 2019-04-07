import { injectable } from 'inversify';
import { MiddlewaresConfig, MiddlewaresConfiguration } from '../../../../src/main';
import * as middlewaresConfiguration from './middlewares-configuration.json';

@injectable()
export class TestMiddlewaresConfig implements MiddlewaresConfig {
    middlewaresConfiguration: MiddlewaresConfiguration;

    constructor() {
        this.middlewaresConfiguration = {
            allowDataVersionMiddleware: middlewaresConfiguration.allowDataVersionMiddleware,
            allowRealityMiddleware: middlewaresConfiguration.allowRealityMiddleware,
        };
    }
}
