export const Mutation = `type Mutation {
                            createBook(book: BookInput!): Book,
                            createAuthor(author: AuthorInput!): Author,
                            updateBook(bookId: String!, update: UpdateBookInput): Book,
                            updateAuthor(authorId: String!, update: UpdateAuthorInput): Author,
                            deleteBook(bookId: String!): Book,
                            deleteAuthor(authorId: String!): Author
                         }`;
