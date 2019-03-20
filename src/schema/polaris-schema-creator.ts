import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import * as commonEntityInterface from './common-entity-interface';

export function makeExecutablePolarisSchema({
    typeDefs,
    resolvers,
    connectors,
    logger,
    allowUndefinedInResolve,
    resolverValidationOptions,
    directiveResolvers,
    schemaDirectives,
    parseOptions,
    inheritResolversFromInterfaces,
}: any): GraphQLSchema {
    const typeDefsWithCommonEntity = `${typeDefs}${commonEntityInterface.default}`;
    return makeExecutableSchema({
        typeDefs: typeDefsWithCommonEntity,
        resolvers,
        connectors,
        logger,
        allowUndefinedInResolve,
        resolverValidationOptions,
        directiveResolvers,
        schemaDirectives,
        parseOptions,
        inheritResolversFromInterfaces,
    });
}
