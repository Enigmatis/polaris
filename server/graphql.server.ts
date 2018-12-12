import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {PolarisLogProperties, PolarisLogger, ApplicationLogProperties} from "@enigmatis/polaris-logs"

const path = require('path');
const express = require('express');
const app = express();

export class PolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;
    private polarisLogger: PolarisLogger;

    constructor(config: any) {
        this.polarisLogger = new PolarisLogger(null, this.getApplicationProperties(config.applicationProperties)) ;        
        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = { typeDefs: config.typeDefs, resolvers: config.resolvers };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);
        let propertiesPath = path.join('./', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(propertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);
        let options = {
            schema: executableSchema,
            cors: PolarisGraphQLServer.getCors(),
            context: ({req}) => ({
                headers: new PolarisRequestHeaders(req.headers)
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
            let polarisProperties = new PolarisLogProperties(`🚀 Server ready at http://localhost:${options['port']}${this.server.graphqlPath}`);
            this.polarisLogger.info(polarisProperties);
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

    public getApplicationProperties(applicationProperties):ApplicationLogProperties{
        if (applicationProperties!= null)
            return new ApplicationLogProperties(applicationProperties.id, applicationProperties.name,
                 applicationProperties.repositoryVersion, applicationProperties.environment,applicationProperties.component);
        return new ApplicationLogProperties("p01aris-10gs", "polaris-logs", "v1", "dev", "component");
    }
    
    public getLogger(){
        return this.polarisLogger;
    }
}
