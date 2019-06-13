import {
    bookByIdResolver,
    bookResolver,
    bookStartsWithResolver,
    createAuthorResolver,
    createBookResolver,
    deleteAuthorResolver,
    deleteBookResolver,
    subscribeResolver,
    updateAuthorResolver,
    updateBookResolver,
} from './book-resolvers-functions';

export const resolvers = {
    Query: {
        books: bookResolver,
        booksStartsWith: bookStartsWithResolver,
        bookById: bookByIdResolver,
    },
    Mutation: {
        createBook: createBookResolver,
        createAuthor: createAuthorResolver,
        updateBook: updateBookResolver,
        updateAuthor: updateAuthorResolver,
        deleteBook: deleteBookResolver,
        deleteAuthor: deleteAuthorResolver,
    },
    Subscription: {
        bookChanged: {
            subscribe: subscribeResolver,
        },
    },
};
