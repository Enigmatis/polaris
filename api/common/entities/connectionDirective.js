const {SchemaDirectiveVisitor} = require("graphql-tools");
const typeDefinitions = `
    directive @connection on FIELD_DEFINITION
    
    type BooksConnection{
        edges: [BooksEdge],
        pageInfo: PageInfo
    }
    
    type BooksEdge{
        node: Book,
        cursor: String!
    }
    
    type PageInfo{
        hasNextPage: Boolean!,
        hasPreviousPage: Boolean!,
        startCursor: String,
        endCursor: String
    }
`;

class ConnectionDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        field.type = this.schema.getType('BooksConnection');
    }
}

module
    .exports = {
    typeDefs: typeDefinitions,
    schemaDirectives: {connection: ConnectionDirective}
};