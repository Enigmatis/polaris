export const BookInput = `input BookInput {
                            id: ID,
                            testId: String!,        
                            title: String,
                            author: AuthorInput,
                          },
                          input UpdateBookInput {
                            title: String,
                            author: AuthorInput,
                          }`;
