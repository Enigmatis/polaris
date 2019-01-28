import { PolarisLogger } from '@enigmatis/polaris-logs';
import {
    InjectableResolver,
    InjectableType,
    LogConfig,
    PolarisServerConfig,
} from '../common/injectable-interfaces';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { SchemaCreator } from '../schema/utils/schema.creator';
import { GraphQLServer } from '../server/graphql.server';

export const POLARIS_TYPES = {
    GraphQLServer: Symbol('GraphQLServer'),
    SchemaCreator: Symbol('SchemaCreator'),
    PolarisLogger: Symbol('PolarisLogger'),
    PolarisMiddleware: Symbol('PolarisMiddleware'),
    PolarisServerConfig: Symbol('PolarisServerConfig'),
    LogConfig: Symbol('LogConfig'),
    InjectableType: Symbol('InjectableType'),
    InjectableResolver: Symbol('InjectableResolver'),
    CommonEntityInterface: Symbol('CommonEntityInterface`'),
};
