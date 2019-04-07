import { initConnection } from '@enigmatis/mongo-driver';
import { GraphqlLogger } from '@enigmatis/utills';
import { Container } from 'inversify';
import { GraphQLServer, POLARIS_TYPES, polarisContainer } from '../../../src/main';
import { TestLogConfig } from './config/log-config';
import { TestMiddlewaresConfig } from './config/middleware-config';
import { TestServerConfig } from './config/server-config';
import { schema } from './schema/schema';

import * as mongoose from 'mongoose';

module.exports = async () => {
    polarisContainer.bind(POLARIS_TYPES.LoggerConfig).to(TestLogConfig);
    polarisContainer.bind(POLARIS_TYPES.PolarisServerConfig).to(TestServerConfig);
    polarisContainer.bind(POLARIS_TYPES.MiddlewaresConfig).to(TestMiddlewaresConfig);

    const mergedContainer = Container.merge(polarisContainer, schema);

    const server: GraphQLServer = mergedContainer.get(POLARIS_TYPES.GraphQLServer);

    const logger = mergedContainer.get<GraphqlLogger<any>>(POLARIS_TYPES.GraphqlLogger);
    logger.debug('JEST global setup');
    const connectionString =
        'mongodb+srv://appusr:apppassword@cluster0-jotpj.mongodb.net/test?retryWrites=true';

    await initConnection({ connectionString, waitUntilReconnectInMs: 5000 }, logger as any);
    await mongoose.connection.db.dropDatabase();
    server.start();
};
