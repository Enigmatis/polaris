export const Book = `type Book implements CommonEntity {
                        testId: String,
                        id: ID!,
                        title: String,
                        author: Author,
                        creationDate: String,
                        lastUpdateDate: String,
                        dataVersion: Int!,
                        realityId: Int!
                     }`;
