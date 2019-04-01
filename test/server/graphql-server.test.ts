import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';
import { applyMiddleware } from 'graphql-middleware';
import 'reflect-metadata';
import { LoggerConfig, PolarisServerConfig } from '../../src/common/injectable-interfaces';
import { PolarisMiddleware } from '../../src/middlewares/polaris-middleware';
import { createMiddleware } from '../../src/middlewares/polaris-middleware-creator';
import { SchemaCreator } from '../../src/schema/utils/schema-creator';
import { PolarisGraphQLServer } from '../../src/server/graphql-server';

const apolloServerMock: { [T in keyof ApolloServer]: any } = {
    applyMiddleware: jest.fn(),
} as any;
jest.mock('apollo-server-koa', () => ({
    makeExecutableSchema: jest.fn(),
    ApolloServer: jest.fn(() => ({
        applyMiddleware: apolloServerMock.applyMiddleware,
    })),
}));
jest.mock('graphql-middleware', () => ({
    applyMiddleware: jest.fn(),
}));
jest.mock('../../src/middlewares/polaris-middleware-creator', () => ({
    createMiddleware: jest.fn(),
}));

describe('graphql-server tests', () => {
    const schemaCreatorMock: { [T in keyof SchemaCreator]: any } = {
        generateSchema: jest.fn(() => ({ def: 'definition', resolvers: jest.fn() })),
    } as any;
    const polarisLog = {
        info: jest.fn(),
    } as any;
    const polarisServerConfigMock: { [T in keyof PolarisServerConfig]: any } = {
        polarisProperties: jest.fn(),
    } as any;
    const polarisMiddlewareMock: { [T in keyof PolarisMiddleware]: any } = {} as any;

    test('creating new polaris server - with arguments - generate schema have been called', () => {
        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMock,
            [polarisMiddlewareMock],
            polarisLog,
        );

        expect(schemaCreatorMock.generateSchema).toHaveBeenCalled();
    });

    test('creating new polaris server - with arguments - make executable schema have been called with generated typeDefs', () => {
        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMock,
            [polarisMiddlewareMock],
            polarisLog,
        );

        expect(makeExecutableSchema).toHaveBeenCalledWith(
            expect.objectContaining({
                typeDefs: schemaCreatorMock.generateSchema().def,
            }),
        );
    });

    test('creating new polaris server - with arguments - graphql apply middleware have been called', () => {
        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMock,
            [polarisMiddlewareMock],
            polarisLog,
        );

        expect(applyMiddleware).toHaveBeenCalled();
    });

    test('creating new polaris server - with arguments - create middleware have been called number of times as middlewares provided', () => {
        const middlewares = [polarisMiddlewareMock, polarisMiddlewareMock, polarisMiddlewareMock];
        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMock,
            middlewares,
            polarisLog,
        );

        expect(createMiddleware).toHaveBeenCalledTimes(middlewares.length);
    });

    test('creating new polaris server - with arguments - apollo server constructor have been called', () => {
        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMock,
            [polarisMiddlewareMock],
            polarisLog,
        );

        expect(ApolloServer).toHaveBeenCalled();
    });

    test('on start - apollo server apply middleware have been called with custom path', () => {
        const polarisServerConfigMockWithEndpoint: { [T in keyof PolarisServerConfig]: any } = {
            polarisProperties: { endpoint: 'test' },
        } as any;

        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMockWithEndpoint,
            [polarisMiddlewareMock],
            polarisLog,
        );
        server.start();
        expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith(
            expect.objectContaining({
                path: polarisServerConfigMockWithEndpoint.polarisProperties.endpoint,
            }),
        );
        server.stop();
    });

    test('on start - with custom app - apollo server apply middleware have been called with custom app', () => {
        const polarisServerConfigMockWithEndpoint: { [T in keyof PolarisServerConfig]: any } = {
            polarisProperties: { endpoint: 'test' },
        } as any;

        const app = {
            listen: jest.fn(),
        } as any;

        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMockWithEndpoint,
            [polarisMiddlewareMock],
            polarisLog,
        );
        server.start(app);
        expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith(
            expect.objectContaining({ app }),
        );
        expect(app.listen).toHaveBeenCalled();
    });

    test('on start - with custom app - apollo server apply middleware have been called with custom app', () => {
        const polarisServerConfigMockWithEndpoint: { [T in keyof PolarisServerConfig]: any } = {
            polarisProperties: { endpoint: 'test' },
        } as any;

        const app = {
            listen: jest.fn(),
        } as any;

        const server = new PolarisGraphQLServer(
            schemaCreatorMock,
            polarisServerConfigMockWithEndpoint,
            [polarisMiddlewareMock],
            polarisLog,
        );
        server.start(app);
        expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith(
            expect.objectContaining({ app }),
        );
        expect(app.listen).toHaveBeenCalled();
    });
});
