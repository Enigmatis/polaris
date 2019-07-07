import { GraphQLResolveInfo } from 'graphql';
import { getCurrentDataVersion } from '../../../../mongo-driver/src/data-version/data-version-manager';
import { IrrelevantEntitiesContainer } from '../../../src/common/irrelevant-entities-container';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { DataVersionFilter } from '../../../src/middlewares/middleware-activation-condition/filter-data-version';
import { PolarisContext } from '../../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};

describe('data version tests', () => {
    test('data version header doesnt exist', () => {
        const result = { dataVersion: 0 };
        const context: PolarisContext = {
            headers: {},
            body: {},
            irrelevantEntities: new IrrelevantEntitiesContainer(),
            dataVersionRetriever: getCurrentDataVersion,
        };
        const middlewareParams: ResponseMiddlewareParams = {
            root: undefined,
            args,
            context,
            info,
            result,
        };
        expect(DataVersionFilter.shouldBeReturned(middlewareParams, false)).toBe(true);
    });
    describe('data version header exist', () => {
        test('entity data version is bigger than headers data version', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
                dataVersionRetriever: getCurrentDataVersion,
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root: undefined,
                args,
                context,
                info,
                result: { dataVersion: 2 },
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams, false)).toBe(true);
        });
        test('entity data version is equal to headers data version', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
                dataVersionRetriever: getCurrentDataVersion,
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root: undefined,
                args,
                context,
                info,
                result: { dataVersion: 1 },
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
        });
        test('entity data version is smaller than headers data version', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 2 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
                dataVersionRetriever: getCurrentDataVersion,
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root: undefined,
                args,
                context,
                info,
                result: { dataVersion: 1 },
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
        });
        test('entity is sub entity', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 2 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
                dataVersionRetriever: getCurrentDataVersion,
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root: undefined,
                args,
                context,
                info,
                result: { dataVersion: 1 },
            };
            expect(DataVersionFilter.shouldBeReturned(middlewareParams, true)).toBe(true);
        });
    });
});
