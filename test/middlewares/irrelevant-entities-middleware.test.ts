import { QueryIrrelevantResult } from '@enigmatis/utills';
import { GraphQLResolveInfo } from 'graphql';
import 'reflect-metadata';
import { IrrelevantEntitiesMiddleware } from '../../src/middlewares/irrelevant-entities-middleware';
import { ResponseMiddlewareParams } from '../../src/middlewares/middleware';
import { PolarisContext } from '../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const irrelevantEntities = ['1234', '2345'];
const resolverResult = [
    {
        _doc: {
            deleted: false,
            _id: { id: '5c5bf81a83e6e21ff08710ed' },
            title: 'zero',
            author: 'Arik',
            creationDate: {},
            lastUpdateDate: {},
            realityId: 0,
            dataVersion: 2,
        },
    },
];
const result = new QueryIrrelevantResult(resolverResult, irrelevantEntities);

describe('split relevantEntities and irrelevant', () => {
    describe('one relevant and two not relevant', () => {
        const root = undefined;
        test('irrelevant entities are correctly separated to context ', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 3 },
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            middleware.postResolve(middlewareParams);
            expect(context.irrelevantEntities).toEqual(irrelevantEntities);
        });
        test('relevant are returned from the middleware without irrelevant ', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 3 },
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(middlewareResult).toEqual(result.relevantEntities);
        });

        test('relevant are returned from the middleware without irrelevant even if data version is 0', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 0 },
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(middlewareResult).toEqual(result.relevantEntities);
        });
    });
});

describe('not modifying result if not needed', () => {
    describe('no data version is presented', () => {
        const root = undefined;
        test('returns the same result', () => {
            const context: PolarisContext = {
                headers: {},
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(middlewareResult).toEqual(middlewareParams.result);
        });
        test('no irrelevant added to context', () => {
            const context: PolarisContext = {
                headers: {},
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(context.irrelevantEntities).toHaveLength(0);
        });
    });
    describe('not a QueryWithIrrelevantResult', () => {
        const root = undefined;
        test('returns the same result', () => {
            const context: PolarisContext = {
                headers: {},
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: resolverResult,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(middlewareResult).toEqual(middlewareParams.result);
        });
        test('no irrelevant added to context', () => {
            const context: PolarisContext = {
                headers: {},
                body: {},
                irrelevantEntities: [],
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: resolverResult,
            };

            const middleware = new IrrelevantEntitiesMiddleware();
            const middlewareResult = middleware.postResolve(middlewareParams);
            expect(context.irrelevantEntities).toHaveLength(0);
        });
    });
});
