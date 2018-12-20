import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {PolarisLogger, ApplicationLogProperties} from "@enigmatis/polaris-logs"
import {GraphQLLogProperties} from "../logs/GraphQLLogProperties";
import {GraphQLLogger} from "../logs/GraphQLLogger";
import {LogProperties} from "../properties/LogProperties";

const path = require('path');
const express = require('express');
const app = express();

export class PolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;
    private _logProperties: LogProperties;
    private polarisLogger: PolarisLogger;

    constructor(config: any) {
        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
            typeDefs: config.typeDefs,
            resolvers: config.resolvers
        };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);

        let polarisPropertiesPath = path.join('./', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(polarisPropertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);

        let logPropertiesPath = path.join('./', "log-configuration.json");
        PropertiesHolder.loadPropertiesFromFile(logPropertiesPath);
        this.initializeLogProperties(PropertiesHolder.properties);

        this.polarisLogger = new GraphQLLogger(this.getApplicationProperties(), this._logProperties.loggerLevel,
            this._logProperties.logstashHost, this._logProperties.logstashPort);
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
            let polarisProperties = new GraphQLLogProperties(`🚀 Server ready at http://localhost:${options['port']}${this.server.graphqlPath}`);
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
        let applicationId = properties['applicationId'];
        let applicationName = properties['applicationName'];
        let repositoryVersion = properties['repositoryVersion'];
        let environment = properties['environment'];
        let component = properties['component'];
        this._polarisProperties = new PolarisProperties(port, endpoint, applicationId, applicationName,
            repositoryVersion, environment, component);
    }

    initializeLogProperties(properties: object): void {
        let loggerLevel = properties['loggerLevel'];
        let logstashHost = properties['logstashHost'];
        let logstashPort = properties['logstashPort'];
        this._logProperties = new LogProperties(loggerLevel, logstashHost, logstashPort);
    }

    public getApplicationProperties(): ApplicationLogProperties {
        let applicationId = this._polarisProperties['applicationId'];
        let applicationName = this._polarisProperties['applicationName'];
        let repositoryVersion = this._polarisProperties['repositoryVersion'];
        let environment = this._polarisProperties['environment'];
        let component = this._polarisProperties['component'];
        return new ApplicationLogProperties(applicationId, applicationName, repositoryVersion, environment, component);
    }

    public getLogger() {
        return this.polarisLogger;
    }
}
