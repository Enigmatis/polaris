const schema = `
        interface CommonEntity {
            id: ID!
            creationDate: String,
            lastUpdateDate: String,
            dataVersion: Int!
        }
        `;

export default schema;
