import {Container} from 'inversify';
import {
    GraphQLLogger,
    IPolarisGraphQLServer,
    ISchemaCreator,
    PolarisGraphQLServer,
    SchemaCreator,
} from '..';
import {decorate, injectable} from 'inversify';
import {PolarisLogger} from '@enigmatis/polaris-logs';
import {PolarisMiddleware} from '..';
import {LoggerMiddleware} from '../middlewares/logger-middleware';
import POLARIS_TYPES from './polaris-types';
import {FilterDataVersionMiddleware} from '../middlewares/filter-data-version';

decorate(injectable(), PolarisLogger);
let polarisContainer = new Container({skipBaseClassChecks: true});
polarisContainer.bind<IPolarisGraphQLServer>(POLARIS_TYPES.IPolarisGraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind<ISchemaCreator>(POLARIS_TYPES.ISchemaCreator).to(SchemaCreator);
polarisContainer.bind<PolarisLogger>(POLARIS_TYPES.PolarisLogger).to(GraphQLLogger);
//polarisContainer.bind<PolarisMiddleware>(POLARIS_TYPES.PolarisMiddleware).to(LoggerMiddleware);
polarisContainer.bind<PolarisMiddleware>(POLARIS_TYPES.PolarisMiddleware).to(FilterDataVersionMiddleware);
export {polarisContainer};