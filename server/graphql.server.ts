import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {ApolloServer, Config, makeExecutableSchema, ServerInfo} from 'apollo-server';

let path = require('path');

export class PolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;

    constructor(config: Config) {
        let executableSchema = makeExecutableSchema(config.schema);
        let propertiesPath = path.join('../', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(propertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);
        let options = {schema: executableSchema, cors: PolarisGraphQLServer.getCors()};
        this.server = new ApolloServer(options);
    }

    public start(): Promise<ServerInfo> {
        let options = {};
        if (this._polarisProperties.port !== undefined) options['port'] = this._polarisProperties.port;
        //if (this._polarisProperties.endpoint !== undefined) this.server.setGraphQLPath(this._polarisProperties.endpoint);

        return this.server.listen(options).then((value => {
            console.log("Server started on: " + value.url);
            return value;
        }))
    }

    private static getCors() {
        return {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
    }

    initializePolarisProperties(properties: object): void {
        let port = properties['port'];
        let endpoint = properties['endpoint'];
        let playground = properties['playground'];
        this._polarisProperties = new PolarisProperties(port, endpoint, playground);
    }
}
