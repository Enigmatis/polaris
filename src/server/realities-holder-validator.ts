import { UserInputError } from 'apollo-server-koa';
import { inject, injectable } from 'inversify';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { RealitiesHolder } from '../realities-holder/realities-holder';
import { PolarisContext } from './polaris-context';

@injectable()
export class RealitiesHolderValidator {
    constructor(@inject(POLARIS_TYPES.RealitiesHolder) private realitiesHolder: any) {}

    validateRealitySupport(context: PolarisContext) {
        if (context) {
            const requestedReality = context.headers.realityId;
            if (
                requestedReality != null &&
                this.realitiesHolder instanceof RealitiesHolder &&
                !this.realitiesHolder.isRealitySupported(requestedReality)
            ) {
                throw new UserInputError(
                    `The requested reality-id ${requestedReality} is not supported!`,
                );
            }
        }
    }
}
