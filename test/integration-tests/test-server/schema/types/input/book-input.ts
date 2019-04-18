export const BookInput = `input BookInput {
                            id: ID!        
                            title: String,
                            author: AuthorInput,
                            otherBook: BookInput
                          },
                          input UpdateBookInput {
                            title: String,
                            author: AuthorInput,
                            otherBook: BookInput
                          }`;
