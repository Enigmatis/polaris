import {GraphQLResolveInfo} from 'graphql';
import {isSubEntity} from "../../../src/middlewares/middleware-activation-condition/filter-condition";

describe('isSubEntity tests', () => {
    it('3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{prev:{}}}}
        } as any;
        expect(isSubEntity(info)).toBe(true);
    });
    it('empty path', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{}
        } as any;
        expect(isSubEntity(info)).toBe(false);
    });
    it('less than 3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{}}}
        } as any;
        expect(isSubEntity(info)).toBe(false);
    });
    it('more than 3 levels to sub entity', () => {
        const info: { [T in keyof GraphQLResolveInfo]: any } = {
            path:{prev:{prev:{prev:{prev:{}}}}}
        } as any;
        expect(isSubEntity(info)).toBe(true);
    });
});