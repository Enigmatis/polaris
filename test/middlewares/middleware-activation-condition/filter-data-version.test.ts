import {GraphQLResolveInfo} from 'graphql';
import {ResponseMiddlewareParams} from '../../../src/middlewares/middleware';
import {DataVersionFilter} from '../../../src/middlewares/middleware-activation-condition/filter-data-version';
import {PolarisContext} from '../../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const result = '';
const dataVersion = '../../../src/middlewares/middleware-activation-condition/filter-data-version';
const filterCondition = '../../../src/middlewares/middleware-activation-condition/filter-condition';

describe('data version tests', () => {
    beforeEach(() => jest.resetModules());
    it('data version header doesnt exist', () => {
        const root = {dataVersion: 0};
        const context: PolarisContext = {headers: {}, body: {}};
        const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
        expect(DataVersionFilter.shouldBeReturned(middlewareParams)).toBe(true);
    });
    describe('data version header exist', () => {
        describe('entity data version is bigger than headers data version', () => {
            it('entity is not a sub entity', () => {
                const root = {dataVersion: 1};
                const context: PolarisContext = {headers: {dataVersion: 0}, body: {}};
                const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                const DataVersion = require(dataVersion).DataVersionFilter;
                expect(DataVersion.shouldBeReturned(middlewareParams)).toBe(true);
            });
            it('entity is a sub entity', () => {
                const root = {dataVersion: 1};
                const context: PolarisContext = {headers: {dataVersion: 0}, body: {}};
                const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                const DataVersion = require(dataVersion).DataVersionFilter;
                expect(DataVersion.shouldBeReturned(middlewareParams)).toBe(true);
            });
        });
        describe('headers data version is bigger than entity data version', () => {
            it('entity is a sub entity', () => {
                const root = {dataVersion: 0};
                const context: PolarisContext = {headers: {dataVersion: 1}, body: {}};
                const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(true)}));
                const DataVersion = require(dataVersion).DataVersionFilter;
                expect(DataVersion.shouldBeReturned(middlewareParams)).toBe(true);
            });
            it('entity is not a sub entity', () => {
                const root = {dataVersion: 0};
                const context: PolarisContext = {headers: {dataVersion: 1}, body: {}};
                const middlewareParams: ResponseMiddlewareParams = {root, args, context, info, result};
                jest.mock(filterCondition, () => ({isSubEntity: jest.fn().mockReturnValue(false)}));
                const DataVersion = require(dataVersion).DataVersionFilter;
                expect(DataVersion.shouldBeReturned(middlewareParams)).toBe(false);
            });
        });
    });
});