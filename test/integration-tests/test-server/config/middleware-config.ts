import { injectable } from 'inversify';
import { MiddlewaresConfig, MiddlewaresConfiguration } from '../../../../src/main';
@injectable()
export class TestMiddlewaresConfig implements MiddlewaresConfig {
    middlewaresConfiguration: MiddlewaresConfiguration;

    constructor() {
        this.middlewaresConfiguration = {
            allowDataVersionMiddleware: true,
            allowRealityMiddleware: true,
        };
    }
}
