import { closeConnection } from '@enigmatis/mongo-driver';
import { logger, server } from './server';

async function finish() {
    logger.debug('JEST global teardown - stop test server');
    await closeConnection();
    await server.stop();
}

module.exports = finish;
