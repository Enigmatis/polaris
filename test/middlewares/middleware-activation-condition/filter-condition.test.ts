import {GraphQLResolveInfo} from 'graphql';
import {isSubEntity} from "../../../src/middlewares/middleware-activation-condition/filter-condition";

describe('isSubEntity tests', () => {
    test('3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{prev:{}}}}
        } as any;
        expect(isSubEntity(info)).toBe(true);
    });
    test('empty path', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{}
        } as any;
        expect(isSubEntity(info)).toBe(false);
    });
    test('less than 3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{}}}
        } as any;
        expect(isSubEntity(info)).toBe(false);
    });
    test('more than 3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{prev:{prev:{}}}}}
        } as any;
        expect(isSubEntity(info)).toBe(true);
    });
});