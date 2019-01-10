import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {ApplicationLogProperties} from "@enigmatis/polaris-logs"
import {GraphQLLogProperties} from "../logging/GraphQLLogProperties";
import {InjectableLogger} from "../logging/GraphQLLogger";
import {LogProperties} from "../properties/LogProperties";
import {inject, injectable} from "inversify";
import {ISchemaCreator} from "../schema/utils/schema.creator";

const path = require('path');
const express = require('express');
const app = express();

export interface IPolarisGraphQLServer {
    start();
}

@injectable()
export class PolarisGraphQLServer implements IPolarisGraphQLServer{
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;
    private _logProperties: LogProperties;
    @inject("InjectableLogger")polarisLogger :InjectableLogger;

    constructor(@inject("ISchemaCreator")creator :ISchemaCreator) {
        let schema = creator.generateSchema()
        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
            typeDefs: schema.def,
            resolvers: schema.resolvers
        };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);

        let polarisPropertiesPath = path.join(__dirname, "../../../polaris-example/properties.json");
        PropertiesHolder.loadPropertiesFromFile(polarisPropertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);

        let logPropertiesPath = path.join(__dirname, "../../../polaris-example/log-configuration.json");
        PropertiesHolder.loadPropertiesFromFile(logPropertiesPath);
        this.initializeLogProperties(PropertiesHolder.properties);

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
        console.log("server start")
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

    private initializePolarisProperties(properties: object): void {
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

    private initializeLogProperties(properties: object): void {
        let loggerLevel = properties['loggerLevel'];
        let logstashHost = properties['logstashHost'];
        let logstashPort = properties['logstashPort'];
        this._logProperties = new LogProperties(loggerLevel, logstashHost, logstashPort);
    }

    private getApplicationProperties(): ApplicationLogProperties {
        let applicationId = this._polarisProperties['applicationId'];
        let applicationName = this._polarisProperties['applicationName'];
        let repositoryVersion = this._polarisProperties['repositoryVersion'];
        let environment = this._polarisProperties['environment'];
        let component = this._polarisProperties['component'];
        return new ApplicationLogProperties(applicationId, applicationName, repositoryVersion, environment, component);
    }
}
