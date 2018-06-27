import {startGraphQLServer} from './server/server.configurations';
import CommonEntities = require('./api/common/commonEntities');

module.exports = {
    RunGraphQLServer: startGraphQLServer,
    CommonEntities: CommonEntities,
};