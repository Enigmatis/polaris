import {
    GraphQLField,
    GraphQLFieldConfig,
    GraphQLFieldConfigMap,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export let typeDefinitions: string = `
    directive @connection on FIELD_DEFINITION    
    
    type PageInfo{
        hasNextPage: Boolean!,
        hasPreviousPage: Boolean!,
        startCursor: String,
        endCursor: String
    }
`;

export class ConnectionDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const typeNameWithoutBraces = field.type.toString().replace(/]/g, '');
        const edgeName = typeNameWithoutBraces + 'sEdge';
        const connectionName = typeNameWithoutBraces + 'sConnection';
        // Create the edge type
        const fieldEdge = new GraphQLObjectType({
            name: edgeName,
            fields: {
                node: { type: field.type },
                cursor: { type: GraphQLString },
            },
        });

        // Create the connection type
        const fieldConnection = new GraphQLObjectType({
            name: connectionName,
            fields: {
                edges: { type: fieldEdge },
                pageInfo: {
                    type: this.schema.getType('PageInfo') as GraphQLObjectType,
                },
            },
        });

        this.schema.getTypeMap()[connectionName] = fieldConnection;
        this.schema.getTypeMap()[edgeName] = fieldEdge;
        field.type = fieldConnection;
    }
}
