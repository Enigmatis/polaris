import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class Mutation implements InjectableType {
    definition = `
             type Mutation {
                 createBook(book: BookInput): Book
                 updateBook(bookId: String!, update: UpdateBookInput): Book,
                 deleteBook(bookId: String!): Book,
             }`;
}
