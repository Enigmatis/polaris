import { GraphQLResolveInfo } from 'graphql';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { DataVersionFilter } from '../../../src/middlewares/middleware-activation-condition/filter-data-version';
import { PolarisContext } from '../../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const result = {};

describe('data version tests', () => {
    test('data version header doesnt exist', () => {
        const root = { dataVersion: 0 };
        const context: PolarisContext = { headers: {}, body: {} };
        const middlewareParams: ResponseMiddlewareParams = { root, args, context, info, result };
        expect(DataVersionFilter.shouldBeReturned(middlewareParams)).toBe(true);
    });
    describe('data version header exist', () => {
        test('entity data version is bigger than headers data version', () => {
            const root = { dataVersion: 2 };
            const context: PolarisContext = { headers: { dataVersion: 1 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams)).toBe(true);
        });
        test('entity data version is equal to headers data version', () => {
            const root = { dataVersion: 1 };
            const context: PolarisContext = { headers: { dataVersion: 1 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams)).toBe(false);
        });
        test('entity data version is smaller than headers data version', () => {
            const root = { dataVersion: 1 };
            const context: PolarisContext = { headers: { dataVersion: 2 }, body: {} };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result,
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams)).toBe(false);
        });
    });
});
