import { closeConnection, initConnection } from '@enigmatis/mongo-driver';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { GraphQLServer } from '../../../src/server/graphql-server';
import { logger } from './server';

export async function startTestServer(server: GraphQLServer) {
    config();
    jest.setTimeout(15000);
    const connectionString =
        'mongodb+srv://appusr:apppassword@cluster0-jotpj.mongodb.net/test?retryWrites=true';
    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.modelNames().forEach(modelName => {
        mongoose.connection.deleteModel(modelName);
    });
    server.start();
}

export async function stopTestServer(server: GraphQLServer) {
    await closeConnection();
    await server.stop();
}
