import {PropertiesHolder} from '../properties/propertiesHolder';
import {PolarisProperties} from '../properties/polarisProperties';
import {makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {ApplicationLogProperties} from "@enigmatis/polaris-logs"
import {GraphQLLogProperties} from "../logging/GraphQLLogProperties";
import {InjectableLogger} from "../logging/GraphQLLogger";
import {LogProperties} from "../properties/LogProperties";
import {provide, buildProviderModule} from "inversify-binding-decorators";
import {Container, inject} from "inversify";
import {ISchemaCreator} from "../schema/utils/schema.creator";

const path = require('path');
const express = require('express');
const app = express();

export interface IPolarisGraphQLServer {
    start();
}

@provide("IPolarisGraphQLServer")
export class PolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;
    private _logProperties: LogProperties;
    private polarisLogger: InjectableLogger;

    constructor(//@inject("InjectableLogger")polarisLogger :InjectableLogger,
               // @inject("ISchemaCreator")creator :ISchemaCreator
    ) {/*
            //this.polarisLogger = polarisLogger;
            let schema = creator.generateSchema()
            let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
                typeDefs: schema.def,
                resolvers: schema.resolvers
            };
            let executableSchema = makeExecutableSchema(executableSchemaDefinition);*/
        let config = { typeDefs:
                [ 'schema {query: Query, mutation: Mutation}',
                    'type Query {\n                    books: [Book] }',
                    '\n             type Book implements CommonEntity {\n                 id: ID!\n                 creationDate: String,\n                 lastUpdateDate: String,\n                 dataVersion: Int!,\n                 title: String @upper,\n                 author: String,\n                 otherBook: Book\n             }\n         ',
                    '\n             type Mutation {\n                 updateBook(book: BookInput!): Book \n             }',
                    'input BookInput{\n                     id: ID!        \n                     title: String,\n                     author: String\n                 }',
                    'interface CommonEntity{\n        id: ID!\n        creationDate: String,\n        lastUpdateDate: String,\n        dataVersion: Int!}' ] , resolvers: [] };

        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
            typeDefs: config.typeDefs,
            resolvers: config.resolvers
        };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);

        let polarisPropertiesPath = path.join('./polaris-example/', "properties.json");
        PropertiesHolder.loadPropertiesFromFile(polarisPropertiesPath);
        this.initializePolarisProperties(PropertiesHolder.properties);

        let logPropertiesPath = path.join('./polaris-example/', "log-configuration.json");
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
            //this.polarisLogger.info(polarisProperties);
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

let container = new Container({skipBaseClassChecks: true});
container.load(buildProviderModule());
export {container}