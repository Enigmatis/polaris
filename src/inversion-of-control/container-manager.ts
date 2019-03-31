import { PolarisLogger } from '@enigmatis/polaris-logs';
import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { PolarisGraphQLLogger } from '../logging/polaris-graphql-logger';
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { PolarisGraphQLServer } from '../server/graphql-server';
import { POLARIS_TYPES } from './polaris-types';

decorate(injectable(), PolarisLogger);
export const polarisContainer = new Container();
polarisContainer.bind(POLARIS_TYPES.GraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind(POLARIS_TYPES.GraphQLLogger).to(PolarisGraphQLLogger);
polarisContainer.bind(POLARIS_TYPES.Middleware).to(PolarisMiddleware);
