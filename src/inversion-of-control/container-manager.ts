import { PolarisLogger } from '@enigmatis/polaris-logs';
import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { GraphqlLogger } from '../logging/graphql-logger';
import { HeadersMiddleware } from '../middlewares/headers-middleware';
import { LoggerMiddleware } from '../middlewares/logger-middleware';
import { PolarisSchemaCreator } from '../schema/utils/schema.creator';
import { PolarisGraphQLServer } from '../server/graphql.server';
import { POLARIS_TYPES } from './polaris-types';

decorate(injectable(), PolarisLogger);
export const polarisContainer = new Container();
polarisContainer.bind(POLARIS_TYPES.GraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind(POLARIS_TYPES.SchemaCreator).to(PolarisSchemaCreator);
polarisContainer.bind(POLARIS_TYPES.PolarisLogger).to(GraphqlLogger);
polarisContainer.bind(POLARIS_TYPES.PolarisMiddleware).to(LoggerMiddleware);
polarisContainer.bind(POLARIS_TYPES.PolarisMiddleware).to(HeadersMiddleware);
