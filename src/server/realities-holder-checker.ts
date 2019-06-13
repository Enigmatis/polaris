import { GraphQLExtension } from 'graphql-extensions';
import { RealitiesHolder } from '../realities-holder/realities-holder';
import { PolarisContext } from './polaris-context';

export class RealitiesHolderChecker extends GraphQLExtension {
    constructor(private realitiesHolder: any) {
        super();
    }

    requestDidStart(responseContext: { context: PolarisContext }) {
        const requestedReality = responseContext.context.headers.realityId;

        const realityIsNotSupported: boolean =
            requestedReality &&
            this.realitiesHolder &&
            this.realitiesHolder instanceof RealitiesHolder &&
            !this.realitiesHolder.isRealitySupported(requestedReality);

        if (realityIsNotSupported) {
            throw new Error(
                `The requested reality-id is not supported!\nConsider support that reality-id with the class that extends RealitiesHolder`,
            );
        }
    }
}
