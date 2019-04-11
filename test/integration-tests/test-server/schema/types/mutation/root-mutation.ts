export const Mutation = `type Mutation {
                            createBook(book: BookInput!): Book,
                            updateBook(bookId: String!, update: UpdateBookInput): Book,
                 deleteBook(bookId: String!): Book,
                         }`;
