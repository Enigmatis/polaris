import { getCurrentDataVersion } from '@enigmatis/mongo-driver';
import { GraphQLResolveInfo } from 'graphql';
import { IrrelevantEntitiesContainer } from '../../../src/common/irrelevant-entities-container';
import { ResponseMiddlewareParams } from '../../../src/middlewares/middleware';
import { RealityIdFilter } from '../../../src/middlewares/middleware-activation-condition/filter-realities';
import { PolarisContext } from '../../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
describe('reality id tests', () => {
    test('reality id header doesnt exist', () => {
        const result = { realityId: 1 };
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
        expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(true);
    });
    test('sub entity reality id is the same as headers reality id', () => {
        const context: PolarisContext = {
            headers: { realityId: 1 },
            body: {},
            irrelevantEntities: new IrrelevantEntitiesContainer(),
            dataVersionRetriever: getCurrentDataVersion,
        };
        const middlewareParams: ResponseMiddlewareParams = {
            root: undefined,
            args,
            context,
            info,
            result: { realityId: 1 },
        };
        expect(RealityIdFilter.shouldBeReturned(middlewareParams, true)).toBe(true);
    });
    test('entity reality id is the same as headers reality id', () => {
        const context: PolarisContext = {
            headers: { realityId: 1 },
            body: {},
            irrelevantEntities: new IrrelevantEntitiesContainer(),
            dataVersionRetriever: getCurrentDataVersion,
        };
        const middlewareParams: ResponseMiddlewareParams = {
            root: undefined,
            args,
            context,
            info,
            result: { realityId: 1 },
        };
        expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(true);
    });
    describe('reality id header exist, and entity reality id and headers reality id do not match ', () => {
        describe('entity is a sub entity ', () => {
            describe('includeLinkedOperation is true', () => {
                test('entity is operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: true },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 0 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, true)).toBe(true);
                });
                test('entity is not operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 2 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, true)).toBe(false);
                });
            });
            describe('includeLinkedOperation is false', () => {
                test('entity is operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 0 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, true)).toBe(false);
                });
                test('entity is not operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 2 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, true)).toBe(false);
                });
            });
        });
        describe('entity is not sub entity', () => {
            describe('includeLinkedOperation is true', () => {
                test('entity is operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: true },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 0 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
                });
                test('entity is not operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 2 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
                });
            });
            describe('includeLinkedOperation is false', () => {
                test('entity is operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 0 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
                });
                test('entity is not operational', () => {
                    const context: PolarisContext = {
                        headers: { realityId: 1, includeLinkedOperation: false },
                        body: {},
                        irrelevantEntities: new IrrelevantEntitiesContainer(),
                        dataVersionRetriever: getCurrentDataVersion,
                    };
                    const middlewareParams: ResponseMiddlewareParams = {
                        root: undefined,
                        args,
                        context,
                        info,
                        result: { realityId: 2 },
                    };
                    expect(RealityIdFilter.shouldBeReturned(middlewareParams, false)).toBe(false);
                });
            });
        });
    });
});
