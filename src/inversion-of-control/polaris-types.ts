import {
    LoggerConfig,
    MiddlewaresConfig,
    PolarisServerConfig,
} from '../common/injectable-interfaces';
import { PolarisGraphQLLogger } from '../logging/polaris-graphql-logger';
import { GraphQLServer } from '../server/graphql-server';

export const POLARIS_TYPES = {
    GraphQLServer: Symbol('GraphQLServer'),
    GraphQLSchema: Symbol('GraphQLSchema'),
    GraphQLLogger: Symbol('PolarisGraphQLLogger'),
    PolarisHeadersFactory: Symbol('PolarisHeadersFactory'),
    Middleware: Symbol('Middleware'),
    PolarisServerConfig: Symbol('PolarisServerConfig'),
    MiddlewaresConfig: Symbol('MiddlewaresConfig'),
    LoggerConfig: Symbol('LoggerConfig'),
    InjectableType: Symbol('InjectableType'),
    InjectableResolver: Symbol('InjectableResolver'),
    CommonEntityInterface: Symbol('CommonEntityInterface`'),
    RealitiesHolder: Symbol('RealitiesHolder'),
    RealitiesHolderValidator: Symbol('RealitiesHolderValidator'),
};
