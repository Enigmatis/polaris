const CommonEntityInterfaceDefinition = `interface CommonEntity{
        id: ID!
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!}`;

module.exports = {types: CommonEntityInterfaceDefinition};