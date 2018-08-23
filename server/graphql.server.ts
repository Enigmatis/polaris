import {GraphQLServer, Options} from 'graphql-yoga'
import {Props} from 'graphql-yoga/dist/types';
import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';

let path = require('path');

export class PolarisGraphQLServer {
    private server: GraphQLServer;
    private _polarisProperties: PolarisProperties;

    constructor(props: Props) {
        let propertiesPath = path.join('../', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(propertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);
        this.server = new GraphQLServer(props);
    }

    public start(options: Options): void {
        if (options == null) {
            options = {};
        }
        options.cors = PolarisGraphQLServer.getCors();
        this.server.start(options, ({port, endpoint}) => {
                console.log(`
                --------
                Polaris server is started on port ${port}
                http://localhost:${port}${endpoint}                
                / Developed by @enigmatis team /
                `
                );
            }
        if (this._polarisProperties.port !== undefined) options.port = this._polarisProperties.port;
        if (this._polarisProperties.endpoint !== undefined) options.endpoint = this._polarisProperties.endpoint;
        if (this._polarisProperties.playground !== undefined) options.playground = this._polarisProperties.playground;
        options.cors = this.getCors();
        this.server.start(options, ({port}) =>
            console.log(
                `Server started, listening on port ${port}`,
            ),
        );
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
        this._polarisProperties = new PolarisProperties(port, endpoint, playground)
    }
}
