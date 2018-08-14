import {SchemaDirectiveVisitor} from "graphql-tools";
import {defaultFieldResolver} from "graphql";
import PolarisTypeWrapper = require("../../../common/polarisTypeWrapper");
import PolarisDirectiveWrapper = require("../../../common/polarisDirectiveWrapper");

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

let UpperCaseWrapper = new PolarisTypeWrapper([definition],null, new PolarisDirectiveWrapper('upper', UpperCaseDirective).toDirective());

export default UpperCaseWrapper;