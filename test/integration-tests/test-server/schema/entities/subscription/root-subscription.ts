import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class Subscription implements InjectableType {
    definition = `
             type Subscription {
                bookChanged(realityId:Int!): Book
            }`;
}
