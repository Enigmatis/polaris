import { injectable } from 'inversify';
import { RealitiesHolder } from '../../../src/realities-holder/realities-holder';

@injectable()
export class TestRealitiesHolder extends RealitiesHolder {
    getRealities(): Set<number> {
        return new Set<number>([0, 2]);
    }
}
