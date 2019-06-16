import { injectable } from 'inversify';
import { RealitiesHolder } from './realities-holder';

@injectable()
export class DefaultRealitiesHolder extends RealitiesHolder {
    getRealities(): Set<number> {
        return new Set<number>();
    }

    isRealitySupported(reality: number): boolean {
        return true;
    }
}
