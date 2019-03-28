import { provide } from 'inversify-binding-decorators';
import { InjectableResolver, POLARIS_TYPES } from '../../../../../src/main';
import {
    bookQueryResolver,
    createBookResolver,
    subscribeResolver,
    titleResolver,
    updateBookResolver,
} from './book-resolvers-functions';

@provide(POLARIS_TYPES.InjectableResolver)
export class BookResolvers implements InjectableResolver {
    resolver = () => ({
        Book: {
            title: titleResolver,
        },
        Query: {
            books: bookQueryResolver,
        },
        Mutation: {
            createBook: createBookResolver,
            updateBook: updateBookResolver,
        },
        Subscription: {
            bookChanged: {
                subscribe: subscribeResolver,
            },
        },
    });
}
