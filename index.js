const Server = require('./server/server.configurations');
const CommonEntities = require('./api/common/commonEntities');

module.exports = {RunGraphQLServer: Server.startGraphQLServer, CommonEntities: CommonEntities};