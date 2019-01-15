import {PolarisProperties} from '../properties/polarisProperties';
import {makeExecutableSchema} from 'apollo-server';
import {ApolloServer} from 'apollo-server-express';
import {PolarisRequestHeaders} from "../http/request/polarisRequestHeaders";
import {LoggerConfiguration} from "@enigmatis/polaris-logs"
import {GraphQLLogProperties} from "../logging/GraphQLLogProperties";
import {InjectableLogger} from "../logging/GraphQLLogger";
import {inject, injectable} from "inversify";
import {ISchemaCreator} from "../schema/utils/schema.creator";
import {ILogConfig, IPolarisServerConfig} from '../common/injectableInterfaces';
import {applyMiddleware} from 'graphql-middleware'
import {LoggerMiddleware} from "../middlewares/logger-middleware";
import {createMiddleware} from "../middlewares/polaris-middleware-creator";

const path = require('path');
const express = require('express');
const app = express();

export interface IPolarisGraphQLServer {
    start();
}

@injectable()
export class PolarisGraphQLServer implements IPolarisGraphQLServer {
    private server: ApolloServer;
    private _polarisProperties: PolarisProperties;
    private _logProperties: LoggerConfiguration;
    @inject("InjectableLogger") polarisLogger: InjectableLogger;

    constructor(@inject("ISchemaCreator")creator: ISchemaCreator,
                @inject("ILogConfig") logConfig: ILogConfig,
                @inject("IPolarisServerConfig") propertiesConfig: IPolarisServerConfig) {
        let schema = creator.generateSchema();
        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
            typeDefs: schema.def,
            resolvers: schema.resolvers
        };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);

        const schemaWithMiddleware = applyMiddleware(
            executableSchema,
            createMiddleware(new LoggerMiddleware())
        )
        this._logProperties = logConfig.getLogConfiguration();
        this._polarisProperties = propertiesConfig.getPolarisProperties()
        let options = {
            schema: schemaWithMiddleware,
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
        if (this._polarisProperties.port !== undefined) {
            options['port'] = this._polarisProperties.port;
        }
        app.listen(options, () => {
            let polarisProperties: GraphQLLogProperties = {
                operationName: 'info'
            };
            this.polarisLogger.info(`🚀 Server ready at http://localhost:${options['port']}${this.server.graphqlPath}`, polarisProperties);
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


}
