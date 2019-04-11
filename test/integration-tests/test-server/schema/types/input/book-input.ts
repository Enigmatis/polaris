export const BookInput = `input BookInput {
                            id: ID!        
                            title: String,
                            author: String,
                            otherBook: BookInput
                          },
                          input UpdateBookInput {
                            title: String,
                            author: String,
                            otherBook: BookInput
                          }`;
