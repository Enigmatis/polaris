import {
    InjectableLogger,
    InjectableResolver,
    IPolarisGraphQLServer,
    IPolarisServerConfig,
    ISchemaCreator,
    PolarisMiddleware,
} from '..';

let POLARIS_TYPES = {
    IPolarisGraphQLServer: Symbol("IPolarisGraphQLServer"),
    ISchemaCreator: Symbol("ISchemaCreator"),
    InjectableLogger: Symbol("InjectableLogger"),
    PolarisMiddleware: Symbol("PolarisMiddleware"),
    IPolarisServerConfig: Symbol("IPolarisServerConfig"),
    ILogConfig: Symbol("ILogConfig"),
    InjectableType: Symbol("InjectableType"),
    InjectableResolver: Symbol("InjectableResolver"),
    CommonEntityInterface: Symbol("CommonEntityInterface")
};

export default POLARIS_TYPES;