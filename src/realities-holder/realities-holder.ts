import { injectable } from 'inversify';

@injectable()
export abstract class RealitiesHolder {
    abstract getRealities(): Set<number>;

    isRealitySupported(reality: number): boolean {
        return this.getRealities().has(reality);
    }
}
