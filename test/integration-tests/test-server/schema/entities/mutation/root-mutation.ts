import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class Mutation implements InjectableType {
    definition = `
             type Mutation {
                 updateBook(book: BookInput!): Book,
                 createBook(book: BookCreationInput): Book
             }`;
}
