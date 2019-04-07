import { provide } from 'inversify-binding-decorators';
import { InjectableResolver, POLARIS_TYPES } from '../../../../../src/main';
import {
    bookByIdQueryResolver,
    bookQueryResolver,
    createBookResolver,
    deleteBookResolver,
    deletedBookByIdQueryResolver,
    subscribeResolver,
    updateBookResolver,
} from './book-resolvers-functions';

@provide(POLARIS_TYPES.InjectableResolver)
export class BookResolvers implements InjectableResolver {
    resolver = () => ({
        Query: {
            books: bookQueryResolver,
            bookById: bookByIdQueryResolver,
            deletedBookById: deletedBookByIdQueryResolver,
        },
        Mutation: {
            createBook: createBookResolver,
            updateBook: updateBookResolver,
            deleteBook: deleteBookResolver,
        },
        Subscription: {
            bookChanged: {
                subscribe: subscribeResolver,
            },
        },
    });
}
