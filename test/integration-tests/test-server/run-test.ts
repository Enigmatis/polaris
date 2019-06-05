import { closeConnection, initConnection } from '@enigmatis/mongo-driver';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { logger, server } from './server';
export async function init() {
    config();
    jest.setTimeout(15000);
    const connectionString =
        'mongodb+srv://appusr:apppassword@cluster0-jotpj.mongodb.net/test?retryWrites=true';
    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.db.dropDatabase();
    server.start();
}

export async function finish() {
    await closeConnection();
    await server.stop();
}
