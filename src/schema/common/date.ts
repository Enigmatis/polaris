import { gql } from 'apollo-server-core';
import { GraphQLDateTime } from 'graphql-iso-date';

export const dateSchema = gql`
    scalar Date
`;
export const dateResolver = { Date: GraphQLDateTime };
