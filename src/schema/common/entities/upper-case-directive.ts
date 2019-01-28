import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import PolarisDirectiveWrapper = require('../../../common/polaris-directive-wrapper');

const definition = `
    directive @upper on FIELD_DEFINITION
`;

export class UpperCaseDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: { resolve?: any }) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = function(...args: any[]) {
            const result = resolve.apply(this, args);
            if (typeof result === 'string') {
                return result.toUpperCase();
            }
            return result;
        };
    }
}
