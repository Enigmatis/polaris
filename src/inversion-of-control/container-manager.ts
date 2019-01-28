import { PolarisLogger } from '@enigmatis/polaris-logs';
import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { GraphqlLogger } from '../logging/graphql-logger';
import { LoggerMiddleware } from '../middlewares/logger-middleware';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { PolarisSchemaCreator, SchemaCreator } from '../schema/utils/schema.creator';
import { GraphQLServer, PolarisGraphQLServer } from '../server/graphql.server';
import { POLARIS_TYPES } from './polaris-types';

decorate(injectable(), PolarisLogger);
const polarisContainer = new Container({ skipBaseClassChecks: true });
polarisContainer.bind<GraphQLServer>(POLARIS_TYPES.GraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind<SchemaCreator>(POLARIS_TYPES.SchemaCreator).to(PolarisSchemaCreator);
polarisContainer.bind<PolarisLogger>(POLARIS_TYPES.PolarisLogger).to(GraphqlLogger);
polarisContainer.bind<PolarisMiddleware>(POLARIS_TYPES.PolarisMiddleware).to(LoggerMiddleware);

export { polarisContainer };
