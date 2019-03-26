import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class Query implements InjectableType {
    definition = `type Query {
                    books: [Book] 
                    }`;
}
