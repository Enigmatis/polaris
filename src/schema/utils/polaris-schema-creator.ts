import { buildSchema, GraphQLSchema } from 'graphql';
import { IExecutableSchemaDefinition, makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas';
import { CommonEntityInterface } from '../common/common-entity-interface';
import { dateSchema } from '../common/date';

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
    const typeDefsWithCommonEntity = mergeTypes(
        [CommonEntityInterface, dateSchema, ...(typeDefs as [])],
        {
            all: true,
        },
    );
    return makeExecutableSchema({
        typeDefs: typeDefsWithCommonEntity,
        resolvers: mergeResolvers(resolvers as []),
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
