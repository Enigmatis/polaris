export const Book = `type Book implements CommonEntity {
                        id: ID!
                        title: String,
                        author: Author,
                        creationDate: String,
                        lastUpdateDate: String,
                        dataVersion: Int!,
                        realityId: Int!
                     }`;
