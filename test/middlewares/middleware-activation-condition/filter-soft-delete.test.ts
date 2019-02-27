import { GraphQLResolveInfo } from 'graphql';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { SoftDeleteFilter } from '../../../src/middlewares/middleware-activation-condition/filter-soft-delete';
import { PolarisContext } from '../../../src/server/polaris-context';

describe('filter-soft-delete tests', () => {
    const args = {};
    const context: PolarisContext = { headers: {}, body: {} };
    const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
    const result = {};

    test('deleted entity should not be returned', () => {
        const root = { deleted: true };
        const middlewareParams: ResponseMiddlewareParams = {
            root,
            args,
            context,
            info,
            result,
        };
        expect(SoftDeleteFilter.shouldBeReturned(middlewareParams, true)).toBe(false);
    });

    test('not deleted entity should be returned', () => {
        const root = { deleted: false };
        const middlewareParams: ResponseMiddlewareParams = {
            root,
            args,
            context,
            info,
            result,
        };
        expect(SoftDeleteFilter.shouldBeReturned(middlewareParams, true)).toBe(true);
    });
});
