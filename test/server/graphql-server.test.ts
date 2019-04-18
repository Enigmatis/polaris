import { ApolloServer } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import 'reflect-metadata';
import { PolarisServerConfig } from '../../src/common/injectable-interfaces';
import { PolarisMiddleware } from '../../src/middlewares/polaris-middleware';
import { createMiddleware } from '../../src/middlewares/polaris-middleware-creator';
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
    const graphQLSchemaMock: { [T in keyof GraphQLSchema]: any } = {
        generateSchema: jest.fn(() => ({ def: 'definition', resolvers: jest.fn() })),
    } as any;
    const polarisLog = {
        info: jest.fn(),
    } as any;
    const polarisServerConfigMock: { [T in keyof PolarisServerConfig]: any } = {
        polarisProperties: jest.fn(),
    } as any;
    const polarisMiddlewareMock: { [T in keyof PolarisMiddleware]: any } = {} as any;

    test('creating new polaris server - with arguments - graphql apply middleware have been called', () => {
        const server = new PolarisGraphQLServer(
            graphQLSchemaMock,
            polarisServerConfigMock,
            [polarisMiddlewareMock],
            polarisLog,
        );

        expect(applyMiddleware).toHaveBeenCalled();
    });

    test('creating new polaris server - with arguments - create middleware have been called number of times as middlewares provided', () => {
        const middlewares = [polarisMiddlewareMock, polarisMiddlewareMock, polarisMiddlewareMock];
        const server = new PolarisGraphQLServer(
            graphQLSchemaMock,
            polarisServerConfigMock,
            middlewares,
            polarisLog,
        );

        expect(createMiddleware).toHaveBeenCalledTimes(middlewares.length);
    });

    test('creating new polaris server - with arguments - apollo server constructor have been called', () => {
        const server = new PolarisGraphQLServer(
            graphQLSchemaMock,
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
            graphQLSchemaMock,
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
            graphQLSchemaMock,
            polarisServerConfigMockWithEndpoint,
            [polarisMiddlewareMock],
            polarisLog,
        );
        server.start(app);
        expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith(
            expect.objectContaining({ app }),
        );
        expect(app.listen).toHaveBeenCalled();
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
            graphQLSchemaMock,
            polarisServerConfigMockWithEndpoint,
            [polarisMiddlewareMock],
            polarisLog,
        );
        server.start(app);
        expect(apolloServerMock.applyMiddleware).toHaveBeenCalledWith(
            expect.objectContaining({ app }),
        );
        expect(app.listen).toHaveBeenCalled();
        server.stop();
    });
});
