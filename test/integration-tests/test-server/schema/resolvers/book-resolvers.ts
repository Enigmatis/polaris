import {
    authorResolver,
    bookByIdResolver,
    bookResolver,
    bookStartsWithResolver,
    createBookResolver,
    deleteBookResolver,
    deletedBookByIdResolver,
    subscribeResolver,
    updateBookResolver,
} from './book-resolvers-functions';

export const resolvers = {
    Query: {
        books: bookResolver,
        booksStartsWith: bookStartsWithResolver,
        bookById: bookByIdResolver,
        deletedBookById: deletedBookByIdResolver,
        authors: authorResolver,
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
