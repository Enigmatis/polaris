import { GraphQLResolveInfo } from 'graphql';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { SoftDeleteFilter } from '../../../src/middlewares/middleware-activation-condition/filter-soft-delete';
import { PolarisContext } from '../../../src/server/polaris-context';

describe('filter-soft-delete tests', () => {
    const args = {};
    const context: PolarisContext = { headers: {}, body: {}, extensions: {} };
    const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
    const root = undefined;

    test('deleted entity should not be returned', () => {
        const middlewareParams: ResponseMiddlewareParams = {
            root,
            args,
            context,
            info,
            result: { deleted: true },
        };
        expect(SoftDeleteFilter.shouldBeReturned(middlewareParams)).toBe(false);
    });

    test('not deleted entity should be returned', () => {
        const middlewareParams: ResponseMiddlewareParams = {
            root,
            args,
            context,
            info,
            result: { deleted: false },
        };
        expect(SoftDeleteFilter.shouldBeReturned(middlewareParams)).toBe(true);
    });
});
