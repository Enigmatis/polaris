import {GraphQLResolveInfo} from 'graphql';
import {ResponseMiddlewareParams} from '../../../src/middlewares/middleware';
import {PolarisContext} from '../../../src/server/polaris-context';
import {RealityIdFilter} from "../../../src/middlewares/middleware-activation-condition/filter-realities";

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const result = '';
const realityId = '../../../src/middlewares/middleware-activation-condition/filter-realities';
const filterCondition = '../../../src/middlewares/middleware-activation-condition/filter-condition';
describe('reality id tests', () => {
    beforeEach(() => jest.resetModules());
    it('reality id header doesnt exist', () => {
        const root = {realityId: '1'};
        const context: PolarisContext = {headers: {}, body: {},};
        const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
        expect(RealityIdFilter.shouldBeReturned(middlewareParams)).toBe(true);
    });
    it('entity reality id is the same as headers reality id', () => {
        const root = {realityId: '1'};
        const context: PolarisContext = {headers: {realityId: '1'}, body: {},};
        const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
        expect(RealityIdFilter.shouldBeReturned(middlewareParams)).toBe(true);
    });
    describe('reality id header exist, and entity reality id and headers reality id do not match ', () => {
        describe('entity is a sub entity ', () => {
            describe('includeLinkedOperation is true', () => {
                it('entity is operational', () => {
                    const root = {realityId: '0'};
                    const context: PolarisContext = {headers: {realityId: '1', includeLinkedOperation: true}, body: {}};
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(true);
                });
                it('entity is not operational', () => {
                    const root = {realityId: '2'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
            });
            describe('includeLinkedOperation is false', () => {
                it('entity is operational', () => {
                    const root = {realityId: '0'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
                it('entity is not operational', () => {
                    const root = {realityId: '2'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
            });
        });
        describe('entity is not sub entity', () => {
            describe('includeLinkedOperation is true', () => {
                it('entity is operational', () => {
                    const root = {realityId: '0'};
                    const context: PolarisContext = {headers: {realityId: '1', includeLinkedOperation: true}, body: {}};
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
                it('entity is not operational', () => {
                    const root = {realityId: '2'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
            });
            describe('includeLinkedOperation is false', () => {
                it('entity is operational', () => {
                    const root = {realityId: '0'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
                it('entity is not operational', () => {
                    const root = {realityId: '2'};
                    const context: PolarisContext = {
                        headers: {realityId: '1', includeLinkedOperation: false},
                        body: {}
                    };
                    const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                    jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                    const RealityId = require(realityId).RealityIdFilter;
                    expect(RealityId.shouldBeReturned(middlewareParams)).toBe(false);
                });
            });
        });
    });
});