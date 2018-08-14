import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLString} from 'graphql';
import PolarisTypeWrapper = require("../../../common/polarisTypeWrapper");
import PolarisDirectiveWrapper = require("../../../common/polarisDirectiveWrapper");

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

let ConnectionDirectiveWrapper: PolarisTypeWrapper = new PolarisTypeWrapper([typeDefinitions], null, new PolarisDirectiveWrapper("connection", ConnectionDirective).toDirective());

export default ConnectionDirectiveWrapper;