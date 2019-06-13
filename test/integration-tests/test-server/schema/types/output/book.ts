export const Book = `type Book implements CommonEntity {
                        testId: String,
                        id: ID!,
                        title: String,
                        author: Author,
                        creationDate: Date,
                        lastUpdateDate: Date,
                        dataVersion: Int!,
                        realityId: Int!
                     }`;
