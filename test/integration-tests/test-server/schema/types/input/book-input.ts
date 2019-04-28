export const BookInput = `input BookInput {
                            id: ID!        
                            title: String,
                            author: AuthorInput,
                          },
                          input UpdateBookInput {
                            title: String,
                            author: AuthorInput,
                          }`;
