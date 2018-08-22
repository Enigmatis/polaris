import {Express} from "express";
import {graphiqlExpress, graphqlExpress} from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as path from "path";
import {GraphQLSchema} from "graphql";
import cors = require('cors');
import PolarisPropertiesReader = require("../properties/propertiesReader");
import PolarisProperties = require("../properties/polarisProperties");

class GraphQLServer {
    private _app: Express;
    private readonly _port: number;
    private readonly _schema: GraphQLSchema;
    private readonly _enableCrossOrigin: boolean;
    private readonly _enableGraphiql: boolean;
    private readonly _enableVoyager: boolean;
    private _polarisProperties: PolarisProperties;

    constructor(app: Express, port: number, schema: GraphQLSchema, enableCrossOrigin: boolean, enableGraphiql: boolean, enableVoyager: boolean) {
        PolarisPropertiesReader.readPropertiesFromFile("properties.json");
        this.initializePolarisProperties(PolarisPropertiesReader.properties);
        this._port = this._polarisProperties.port;
        this._app = app;
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
        console.log('The following properties have been loaded:');
        console.log(JSON.stringify(this._polarisProperties));
        console.log('----------------------------------------------------------');
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

    initializePolarisProperties(properties: object): void {
        let port = properties['port'];
        let yogaProperties = properties['yogaProperties'];
        this._polarisProperties = new PolarisProperties(port, yogaProperties)
    }
}

export {GraphQLServer as GraphQLServer};
