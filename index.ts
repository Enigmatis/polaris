import {startGraphQLServer} from './server/server.configurations';
import * as CommonEntities from './api/common/commonEntities';
import PolarisTypeWrapper = require('./common/polarisTypeWrapper');

// noinspection JSUnusedGlobalSymbols
export {
    startGraphQLServer as RunGraphQLServer,
    CommonEntities,
    PolarisTypeWrapper
};