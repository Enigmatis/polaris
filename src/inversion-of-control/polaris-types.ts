import {
    HeaderConfig,
    InjectableResolver,
    InjectableType,
    LoggerConfig,
    PolarisServerConfig,
} from '../common/injectable-interfaces';
import { PolarisGraphqlLogger } from '../logging/polaris-graphql-logger';
import { SchemaCreator } from '../schema/utils/schema-creator';
import { GraphQLServer } from '../server/graphql-server';

export const POLARIS_TYPES = {
    GraphQLServer: Symbol('GraphQLServer'),
    SchemaCreator: Symbol('SchemaCreator'),
    GraphqlLogger: Symbol('PolarisGraphqlLogger'),
    PolarisHeadersFactory: Symbol('PolarisHeadersFactory'),
    Middleware: Symbol('Middleware'),
    PolarisServerConfig: Symbol('PolarisServerConfig'),
    HeaderConfig: Symbol('HeaderConfig'),
    LoggerConfig: Symbol('LoggerConfig'),
    InjectableType: Symbol('InjectableType'),
    InjectableResolver: Symbol('InjectableResolver'),
    CommonEntityInterface: Symbol('CommonEntityInterface`'),
};
