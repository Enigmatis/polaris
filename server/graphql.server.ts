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
import {IConfig} from '../common/injectableInterfaces';


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

    constructor(@inject("ISchemaCreator")creator :ISchemaCreator,
                @inject("IConfig") config: IConfig) {
        let schema = creator.generateSchema();
        let executableSchemaDefinition: { typeDefs: any, resolvers: any } = {
            typeDefs: schema.def,
            resolvers: schema.resolvers
        };
        let executableSchema = makeExecutableSchema(executableSchemaDefinition);

        this._logProperties = config.getLogProperties();
        this._polarisProperties = config.getPolarisProperties()
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


}
