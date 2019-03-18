import { PolarisLogger } from '@enigmatis/polaris-logs';
import { Container, decorate, injectable } from 'inversify';
import 'reflect-metadata';
import { PolarisGraphqlLogger } from '../logging/polaris-graphql-logger';
import {IrrelevantEntitiesMiddleware} from "../middlewares/irrelevant-entities-middleware";
import { PolarisMiddleware } from '../middlewares/polaris-middleware';
import { PolarisSchemaCreator } from '../schema/utils/schema-creator';
import { PolarisGraphQLServer } from '../server/graphql-server';
import { POLARIS_TYPES } from './polaris-types';

decorate(injectable(), PolarisLogger);
export const polarisContainer = new Container();
polarisContainer.bind(POLARIS_TYPES.GraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind(POLARIS_TYPES.SchemaCreator).to(PolarisSchemaCreator);
polarisContainer.bind(POLARIS_TYPES.GraphqlLogger).to(PolarisGraphqlLogger);
polarisContainer.bind(POLARIS_TYPES.Middleware).to(PolarisMiddleware);
polarisContainer.bind(POLARIS_TYPES.Middleware).to(IrrelevantEntitiesMiddleware);
