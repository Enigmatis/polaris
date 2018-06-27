import express = require('express');
import bodyParser = require('body-parser');
import {makeExecutableSchema} from 'graphql-tools';

import {GraphQLServer} from './graphql.server';
import {GraphQLSchema} from "graphql";

function startGraphQLServer(schemaObject: any, port: number, enableGraphiql: boolean = true, enableVoyager: boolean = true, enableCrossOrigin: boolean = true) {
    let schema: GraphQLSchema = makeExecutableSchema(schemaObject);
    let app = express();

    let server: GraphQLServer = new GraphQLServer(app, port, schema, enableCrossOrigin, enableGraphiql, enableVoyager);

    server.createEndpoints();
    server.listen();
}

export {startGraphQLServer};