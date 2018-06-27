import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLString} from 'graphql';
import {PolarisDirectiveWrapper, PolarisTypeWrapper} from "../../../common/polarisTypeWrapper";

let typeDefinitions: string = `
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
        let typeNameWithoutBraces = field.type.toString().replace(/\]|\[/g, '');
        let edgeName = typeNameWithoutBraces + "sEdge";
        let connectionName = typeNameWithoutBraces + "sConnection";
        // Create the edge type
        let fieldEdge = new GraphQLObjectType({
            name: edgeName,
            fields: {
                node: {type: field.type},
                cursor: {type: GraphQLString}
            }
        });

        // Create the connection type

        let edgesField: GraphQLFieldConfig<any, any> = {type: fieldEdge};
        let pageInfoField: GraphQLFieldConfig<any, any> = {type: this.schema.getType('PageInfo') as GraphQLObjectType};

        let fields: GraphQLFieldConfigMap<any, any> = {
            edges: edgesField
            ,
            pageInfo: pageInfoField
        };

        let fieldConnection = new GraphQLObjectType({
            name: connectionName,
            fields: fields
        });

        this.schema.getTypeMap()[connectionName] = fieldConnection;
        this.schema.getTypeMap()[edgeName] = fieldEdge;
        field.type = fieldConnection;
    }
}

let connectionDirectiveWrapper: PolarisTypeWrapper = new PolarisTypeWrapper([typeDefinitions], new PolarisDirectiveWrapper("connection", ConnectionDirective));

export {connectionDirectiveWrapper};