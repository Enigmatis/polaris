import {Container} from 'inversify';
import {
    GraphQLLogger,
    InjectableLogger,
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

decorate(injectable(), PolarisLogger);
let polarisContainer = new Container({skipBaseClassChecks: true});
polarisContainer.bind<IPolarisGraphQLServer>(POLARIS_TYPES.IPolarisGraphQLServer).to(PolarisGraphQLServer);
polarisContainer.bind<ISchemaCreator>(POLARIS_TYPES.ISchemaCreator).to(SchemaCreator);
polarisContainer.bind<InjectableLogger>(POLARIS_TYPES.InjectableLogger).to(GraphQLLogger);
polarisContainer.bind<PolarisMiddleware>(POLARIS_TYPES.PolarisMiddleware).to(LoggerMiddleware);
export {polarisContainer};