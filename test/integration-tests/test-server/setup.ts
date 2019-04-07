import { initConnection } from '@enigmatis/mongo-driver';
import { GraphqlLogger } from '@enigmatis/utills';
import { config } from 'dotenv';
import * as mongoose from 'mongoose';
import { polarisContainer } from '../../../src/inversion-of-control/container-manager';
import { GraphQLServer, POLARIS_TYPES } from '../../../src/main';
import { TestLogConfig } from './config/log-config';
import { TestMiddlewaresConfig } from './config/middleware-config';
import { TestServerConfig } from './config/server-config';
import { schema } from './schema/schema';

async function init() {
    config();
    polarisContainer.bind(POLARIS_TYPES.LoggerConfig).to(TestLogConfig);
    polarisContainer.bind(POLARIS_TYPES.PolarisServerConfig).to(TestServerConfig);
    polarisContainer.bind(POLARIS_TYPES.MiddlewaresConfig).to(TestMiddlewaresConfig);
    polarisContainer.bind(POLARIS_TYPES.GraphQLSchema).toConstantValue(schema);

    const server: GraphQLServer = polarisContainer.get<GraphQLServer>(POLARIS_TYPES.GraphQLServer);
    const logger = polarisContainer.get<GraphqlLogger<any>>(POLARIS_TYPES.GraphQLLogger);

    logger.debug('JEST global setup');
    const connectionString =
        'mongodb+srv://appusr:apppassword@cluster0-jotpj.mongodb.net/test?retryWrites=true';

    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.db.dropDatabase();
    server.start();
}

module.exports = init;
