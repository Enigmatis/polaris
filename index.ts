import {startGraphQLServer} from './server/server.configurations';
import * as CommonEntities from './schema/common/commonEntities';
import PolarisTypeWrapper = require('./common/polarisTypeWrapper');
import {InjectableType, InjectableResolver} from './common/injectableInterfaces';

// noinspection JSUnusedGlobalSymbols
export {
    startGraphQLServer as RunGraphQLServer,
    CommonEntities,
    PolarisTypeWrapper,
    InjectableType,
    InjectableResolver
};