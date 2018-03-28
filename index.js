const Server = require('./server/server.configurations');
const CommonEntities = require('./api/common/commonEntities');
const CommonDirectives = require('./api/common/commonDirectives');
module.exports = {
    RunGraphQLServer: Server.startGraphQLServer,
    CommonEntities: CommonEntities,
    CommonDirectives: CommonDirectives
};