import { GraphQLSchema } from 'graphql';
import { makeExecutablePolarisSchema } from '../../../../src/main';
import { resolvers } from './resolvers/book-resolvers';
import {
    Author,
    AuthorInput,
    Book,
    BookInput,
    Mutation,
    Query,
    Subscription,
} from './types/schema-types';

export const schema: GraphQLSchema = makeExecutablePolarisSchema({
    typeDefs: [Author, AuthorInput, Book, BookInput, Mutation, Query, Subscription],
    resolvers: [resolvers],
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
});
