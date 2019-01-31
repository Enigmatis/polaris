import {
    InjectableResolver,
    InjectableType,
    LogConfig,
    PolarisServerConfig,
} from '../common/injectable-interfaces';
import { GraphqlLogger } from '../logging/graphql-logger';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { SchemaCreator } from '../schema/utils/schema.creator';
import { GraphQLServer } from '../server/graphql.server';

export const POLARIS_TYPES = {
    GraphQLServer: Symbol('GraphQLServer'),
    SchemaCreator: Symbol('SchemaCreator'),
    GraphqlLogger: Symbol('GraphqlLogger'),
    PolarisMiddleware: Symbol('PolarisMiddleware'),
    PolarisServerConfig: Symbol('PolarisServerConfig'),
    LogConfig: Symbol('LogConfig'),
    InjectableType: Symbol('InjectableType'),
    InjectableResolver: Symbol('InjectableResolver'),
    CommonEntityInterface: Symbol('CommonEntityInterface`'),
};
