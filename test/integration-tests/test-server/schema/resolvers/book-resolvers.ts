import {
    bookByIdQueryResolver,
    bookQueryResolver,
    bookStartsWithQueryResolver,
    createBookResolver,
    deleteBookResolver,
    deletedBookByIdQueryResolver,
    subscribeResolver,
    titleResolver,
    updateBookResolver,
} from './book-resolvers-functions';

export const resolvers = {
    Query: {
        books: bookQueryResolver,
        booksStartsWith: bookStartsWithQueryResolver,
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
};
