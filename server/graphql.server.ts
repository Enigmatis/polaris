import {Express} from "express";
import {IExecutableSchemaDefinition} from "graphql-tools";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as path from "path";
import cors = require('cors');
import {GraphQLOptions} from "apollo-server-core/dist";
import {GraphQLSchema} from "graphql";

class GraphQLServer {
    private _app: Express;
    private _port: number;
    private _schema: GraphQLSchema;
    private _enableCrossOrigin: boolean;
    private _enableGraphiql: boolean;
    private _enableVoyager: boolean;

    constructor(app: Express, port: number, schema: GraphQLSchema, enableCrossOrigin: boolean, enableGraphiql: boolean, enableVoyager: boolean) {
        this._app = app;
        this._port = port;
        this._schema = schema;
        this._enableCrossOrigin = enableCrossOrigin;
        this._enableGraphiql = enableGraphiql;
        this._enableVoyager = enableVoyager;
    }

    createEndpoints(): void {
        if (this._enableCrossOrigin) {
            this._app.use(cors());
        }

        this._app.use('/graphql', bodyParser.json(), graphqlExpress({
            schema: this._schema
        }));

        if (this._enableGraphiql) {
            this._app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
        }
        if (this._enableVoyager) {
            this._app.get('/voyager', function (req, res) {
                res.sendFile(path.join(__dirname, '/voyager/index.html'))
            });
        }

    }

    listen(): void {
        this._app.listen(this._port, () => {
            console.log('POLARIS graphql server is now running');
            console.log('----------------------------------------------------------');
            console.log('GraphQL endpoint is now running at: http://localhost:' + this._port + '/graphql');
            if (this._enableGraphiql) {
                console.log('GraphiQL is now running at: http://localhost:' + this._port + '/graphiql');
            }
            if (this._enableVoyager) {
                console.log('Voyager is now running at: http://localhost:' + this._port + '/voyager');
            }
            if (this._enableCrossOrigin) {
                console.log('Cross Origin is enabled.');
            }
        });
    }

}

export {GraphQLServer as GraphQLServer};
