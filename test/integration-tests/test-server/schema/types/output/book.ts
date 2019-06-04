export const Book = `type Book implements CommonEntity {
                        testId: String,
                        id: ID!,
                        creationDate: Date,
                        lastUpdateDate: Date,
                        dataVersion: Int!,
                        title: String,
                        author: String,
                        otherBook: ID,
                        realityId: Int!
                     }`;
