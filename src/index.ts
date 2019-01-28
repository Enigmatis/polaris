import { PolarisLogger } from '@enigmatis/polaris-logs';

import {
    InjectableResolver,
    InjectableType,
    LogConfig,
    PolarisServerConfig,
} from './common/injectable-interfaces';
import { polarisContainer } from './inversion-of-control/container-manager';
import POLARIS_TYPES from './inversion-of-control/polaris-types';
import { GraphqlLogger } from './logging/graphql-logger';
import { PolarisMiddleware } from './middlewares/polaris-middleware';
import { PolarisProperties } from './properties/polaris-properties';
import * as CommonEntities from './schema/common/common-entities';
import { CommonEntityInterface } from './schema/common/entities/common-entity-interface';
import { PolarisSchemaCreator, SchemaCreator } from './schema/utils/schema.creator';
import { GraphQLServer, PolarisGraphQLServer } from './server/graphql.server';

export {
    CommonEntityInterface,
    CommonEntities,
    PolarisGraphQLServer,
    InjectableType,
    InjectableResolver,
    PolarisLogger,
    GraphqlLogger,
    SchemaCreator,
    PolarisSchemaCreator,
    GraphQLServer,
    LogConfig,
    PolarisServerConfig,
    PolarisProperties,
    polarisContainer,
    PolarisMiddleware,
    POLARIS_TYPES,
};
