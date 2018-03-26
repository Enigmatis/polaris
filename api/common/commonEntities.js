const CommonEntity = `interface CommonEntity{
        id: ID!
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!}`;

module.exports = [{name: 'commonEntityInterface', types: CommonEntity}];