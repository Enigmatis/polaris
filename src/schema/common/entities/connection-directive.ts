import {
    GraphQLFieldConfig,
    GraphQLFieldConfigMap,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import PolarisDirectiveWrapper = require('../../../common/polaris-directive-wrapper');

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
    public visitFieldDefinition(field: any) {
        const typeNameWithoutBraces = field.type.toString().replace(/\]|\[/g, '');
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

        const edgesField: GraphQLFieldConfig<any, any> = { type: fieldEdge };
        const pageInfoField: GraphQLFieldConfig<any, any> = {
            type: this.schema.getType('PageInfo') as GraphQLObjectType,
        };

        const fields: GraphQLFieldConfigMap<any, any> = {
            edges: edgesField,
            pageInfo: pageInfoField,
        };

        const fieldConnection = new GraphQLObjectType({
            name: connectionName,
            fields,
        });

        this.schema.getTypeMap()[connectionName] = fieldConnection;
        this.schema.getTypeMap()[edgeName] = fieldEdge;
        field.type = fieldConnection;
    }
}
