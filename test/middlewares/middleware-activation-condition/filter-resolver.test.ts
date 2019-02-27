import { GraphQLResolveInfo } from 'graphql';
import { FilterResolver } from '../../../src/middlewares/filter-resolver';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { PolarisContext } from '../../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const result: any = [
    {
        deleted: false,
        _id: { id: '5c5bf81a83e6e21ff08710ed' },
        title: 'zero',
        author: 'BiKoV',
        creationDate: {},
        lastUpdateDate: {},
        __v: 0,
        realityId: 0,
        dataVersion: 2,
    },
];
describe('filter resolver tests', () => {
    describe('not a sub entity', () => {
        const root = undefined;
        test('data version filter off', () => {
            const context: PolarisContext = { headers: { dataVersion: 3 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            const filterResolver = new FilterResolver({ allowDataVersionMiddleware: false });
            expect(filterResolver.filterEntities(middlewareParams)).toEqual(result);
        });
        test('reality id filter off', () => {
            const context: PolarisContext = { headers: { realityId: 1 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            const filterResolver = new FilterResolver({ allowRealityMiddleware: false });
            expect(filterResolver.filterEntities(middlewareParams)).toEqual(result);
        });
    });
    describe('sub entity', () => {
        const root: any = { realityId: 0, dataVersion: 1 };
        test('not a repository entity', () => {
            const entity = 'this is not a repository entity';
            const context: PolarisContext = { headers: { realityId: 1 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: { entity },
            };
            const filterResolver = new FilterResolver();
            expect(filterResolver.filterResolveResult(middlewareParams)).toEqual({ entity });
        });
        test('is a repository entity and reality id filter off', () => {
            const context: PolarisContext = { headers: { realityId: 1 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            const filterResolver = new FilterResolver({ allowRealityMiddleware: false });
            expect(filterResolver.filterResolveResult(middlewareParams)).toEqual(result);
        });
    });
});
