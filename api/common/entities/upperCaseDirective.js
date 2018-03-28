const {SchemaDirectiveVisitor} = require("graphql-tools");
const {defaultFieldResolver} = require("graphql");

const typeDefinitions = `
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

module.exports = {
    typeDefs: typeDefinitions,
    schemaDirectives: {upper: UpperCaseDirective}
};