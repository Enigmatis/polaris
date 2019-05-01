export const BookInput = `input BookInput {
                            id: ID,
                            testId: String!,        
                            title: String,
                            author: String,
                            otherBook: BookInput
                          },
                          input UpdateBookInput {
                            title: String,
                            author: String,
                            otherBook: BookInput
                          }`;
