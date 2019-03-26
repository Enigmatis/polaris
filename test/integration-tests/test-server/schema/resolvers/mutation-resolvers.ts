import { provide } from 'inversify-binding-decorators';
import { InjectableResolver, POLARIS_TYPES } from '../../../../../src/main';
import { Book } from '../entities/book';
import { books } from './query-resolvers';
let id = 5;
@provide(POLARIS_TYPES.InjectableResolver)
export class MutationResolvers implements InjectableResolver {
    resolver(): any {
        return {
            Mutation: {
                updateBook(_: any, { book }: { book: any }) {
                    return { id: book.id, title: book.title, author: book.author };
                },
                createBook(_: any, { book }: { book: any }) {
                    id++;
                    const b: Book = {
                        id: id.toString(),
                        _id: { id: id.toString() },
                        title: book.title,
                        author: book.author,
                        dataVersion: 1,
                        creationDate: { date: '1.1.1' },
                        lastUpdateDate: { date: '1.1.1' },
                        realityId: 0,
                        deleted: false,
                    };
                    books.push({
                        _doc: b,
                    });
                    return b;
                },
            },
        };
    }
}
