import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {Config, makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {HeaderNames} from "../http/headerNames";

const path = require('path');
const express = require('express');
const app = express();

export class PolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;

    constructor(config: Config) {
        let executableSchema = makeExecutableSchema(config.schema);
        let propertiesPath = path.join('../', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(propertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);
        let options = {
            schema: executableSchema,
            cors: PolarisGraphQLServer.getCors(),
            context: ({req}) => ({
                headers: new PolarisRequestHeaders(req.headers[HeaderNames.DATA_VERSION], req.headers[HeaderNames.SNAPSHOT],
                    req.headers[HeaderNames.INCLUDE_LINKED_OPER], req.headers[HeaderNames.SNAPSHOT_PAGE_SIZE],
                    req.headers[HeaderNames.POLLING], req.headers[HeaderNames.REQUEST_ID], req.headers[HeaderNames.UPN],
                    req.headers[HeaderNames.EVENT_KIND], req.headers[HeaderNames.REALITY_ID],
                    req.headers[HeaderNames.REQUESTING_SYS], req.headers[HeaderNames.REQUESTING_SYS_NAME])
            })
        };
        this.server = new ApolloServer(options);
        if (this._polarisProperties.endpoint !== undefined) {
            this.server.applyMiddleware({app, path: this._polarisProperties.endpoint});
        } else {
            this.server.applyMiddleware({app});
        }
    }

    public start() {
        let options = {};
        if (this._polarisProperties.port !== undefined) options['port'] = this._polarisProperties.port;

        app.listen(options, () => {
            console.log(`🚀 Server ready at http://localhost:${options['port']}${this.server.graphqlPath}`);
        });
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
        this._polarisProperties = new PolarisProperties(port, endpoint);
    }
}
