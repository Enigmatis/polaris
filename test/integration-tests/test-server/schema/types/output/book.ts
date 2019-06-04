export const Book = `type Book implements CommonEntity {
                        id: ID!
                        creationDate: Date,
                        lastUpdateDate: Date,
                        dataVersion: Int!,
                        title: String,
                        author: String,
                        otherBook: ID,
                        realityId: Int!
                     }`;
