import { buildSchema, GraphQLSchema } from 'graphql';
import { IExecutableSchemaDefinition, makeExecutableSchema } from 'graphql-tools';
import { CommonEntityInterface } from '../common/common-entity-interface';

export function makeExecutablePolarisSchema<TContext = any>({
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
}: IExecutableSchemaDefinition<TContext>): GraphQLSchema {
    const typeDefsWithCommonEntity = [...(typeDefs as []), CommonEntityInterface];
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

export function buildPolarisSchema(source: string): GraphQLSchema {
    const typeDefsWithCommonEntity = `${source}${CommonEntityInterface}`;
    return buildSchema(typeDefsWithCommonEntity);
}
