export const Query = `type Query {
                        books: [Book]
                        bookById(bookId:String!): Book
                        booksStartsWith(startsWith:String!): [Book]
                      }`;
