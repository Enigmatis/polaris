import {SchemaDirectiveVisitor} from "graphql-tools";
import {defaultFieldResolver} from "graphql";
import {PolarisDirectiveWrapper, PolarisTypeWrapper} from "../../../common/polarisTypeWrapper";

let definition = `
    directive @upper on FIELD_DEFINITION
`;

class UpperCaseDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;
        field.resolve = function (...args) {
            const result = resolve.apply(this, args);
            if (typeof result === 'string') {
                return result.toUpperCase();
            }
            return result;
        }
    };
}

let upperCaseWrapper = new PolarisTypeWrapper([definition], new PolarisDirectiveWrapper('upper', UpperCaseDirective));

export {upperCaseWrapper};