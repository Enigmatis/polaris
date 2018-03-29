const {SchemaDirectiveVisitor} = require("graphql-tools");
const {GraphQLObjectType, GraphQLString} = require('graphql');
const typeDefinitions = `
    directive @connection on FIELD_DEFINITION    
    
    type PageInfo{
        hasNextPage: Boolean!,
        hasPreviousPage: Boolean!,
        startCursor: String,
        endCursor: String
    }
`;

class ConnectionDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        var typeNameWithoutBraces = field.type.toString().replace(/\]|\[/g, '');
        var edgeName = typeNameWithoutBraces + "Edge";
        var connectionName = typeNameWithoutBraces + "Connection";
        // Create the edge type
        var fieldEdge = new GraphQLObjectType({
            name: edgeName,
            fields: {
                node: {type: field.type},
                cursor: {type: GraphQLString}
            }
        });
        // Create the connection type
        var fieldConnection = new GraphQLObjectType({
            name: connectionName,
            fields: {
                edges: {type: fieldEdge},
                pageInfo: {
                    type: this.schema.getType('PageInfo')
                }
            }
        });
        this.schema._typeMap[connectionName] = fieldConnection;
        this.schema._typeMap[edgeName] = fieldEdge;
        field.type = fieldConnection;
    }
}

module
    .exports = {
    typeDefs: [typeDefinitions],
    schemaDirectives: {connection: ConnectionDirective}
};