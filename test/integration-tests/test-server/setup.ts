import { initConnection } from '@enigmatis/mongo-driver';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { prepareDb } from './db-preparations';
import { logger, server } from './server';

async function init() {
    config();
    logger.debug('JEST global setup');
    const connectionString =
        'mongodb+srv://appusr:apppassword@cluster0-jotpj.mongodb.net/test?retryWrites=true';

    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.db.dropDatabase();
    await prepareDb();
    server.start();
}

module.exports = init;
