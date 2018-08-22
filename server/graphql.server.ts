import {GraphQLServer, Options} from 'graphql-yoga'
import {Props} from 'graphql-yoga/dist/types';
import PolarisPropertiesReader = require("../properties/propertiesReader");
import PolarisProperties = require("../properties/polarisProperties");

export class PolarisGraphQLServer {
    private server: GraphQLServer;
    private _polarisProperties: PolarisProperties;

    constructor(props: Props) {
        PolarisPropertiesReader.readPropertiesFromFile("properties.json");
        this.initializePolarisProperties(PolarisPropertiesReader.properties);
        this.server = new GraphQLServer(props);
    }

    public start(options: Options): void {
        if (options == null) {
            options = {};
            options.port = this._polarisProperties.port;
        }
        options.cors = this.getCors();
        this.server.start(options, ({port}) =>
            console.log(
                `Server started, listening on port ${port}`,
            ),
        );

    }

    private getCors() {
        return {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
    }

    initializePolarisProperties(properties: object): void {
        let port = properties['port'];
        let yogaProperties = properties['yogaProperties'];
        this._polarisProperties = new PolarisProperties(port, yogaProperties)
    }
}
