![logo](static/img/polaris-iconsmall.png?raw=true) 
# Polaris

[![Build Status](https://travis-ci.com/Enigmatis/polaris.svg?branch=master)](https://travis-ci.com/Enigmatis/polaris)
[![NPM version](https://img.shields.io/npm/v/@enigmatis/polaris.svg?style=flat-square)](https://www.npmjs.com/package/@enigmatis/polaris)

A node.js express engine for creating GraphQL server easily, with base standardization and common types

## Getting Started
This module exposes 2 fields: RunGraphQLServer method and the CommonEntities object.
Every "polaris" entity is an object with the following fields:
- typeDefs: string representation of the type definitions required by this entity.
    - for example, a Book entity definition will be supplied to typeDefs. ``type Book { id: string, name: string }``
- resolvers: an object that holds the resolver functions for this entity, as defined in GraphQL-Tools.
- schemaDirectives: an object that holds the directives functions for this entity, as defined in GraphQL-Tools.
The schema is a "polaris" entity by itself.

In order to run the server, you can use the following code:
```JavaScript
const {RunGraphQLServer} = require('@enigmatis/polaris');
const Schema = require('./schema/schema');
RunGraphQLServer(Schema, 3000);
```
Where schema is your executable schema as defined by GraphQL-Tools.

The `RunGraphQLServer` function's arguments are the executable schema and the port you want to run your service on.

Attention - do not execute ``makeExecutableSchema(schema)`` - **We will do this for you**.
You should supply the schema **before** the making.

### An example of a schema

The ``schema.js`` file will look like this:
```JavaScript
const {merge} = require('lodash');

// Get the Query Root object
const Query = require('./entities/query/rootQuery');

// Get the Mutation Root object
const Mutation = require('./entities/mutation/rootMutation');

// Create the schema definition
const SchemaDefinition = `schema {query: Query, mutation: Mutation}`;

// Create the schema mutationResolvers
const resolvers = merge(Query.resolvers, Mutation.resolvers);

// Export an executable schema
module.exports = {
    // The schema is a combination of the schema definition, the Query types and the Mutation types
    typeDefs: [SchemaDefinition, ...Query.typeDefs, ...Mutation.typeDefs],
    resolvers,
    schemaDirectives: Query.schemaDirectives
};
```

We are using the `lodash` **merge** function in order to merge our objects (such as resolvers).

The `queryRoot.js` file will look like this:
```JavaScript
// We use book in our Query object
const Book = require('./../output/book');
const {merge} = require('lodash');
// Get the Query's mutationResolvers
const resolvers = require('../../resolvers/queryResolvers');
// Create the type Query's schema
const Query = `type Query { books: [Book] }`;

module.exports = {
    // Combine the Query type schema with the Book types schema because we use it in the Query type
    typeDefs: [Query, ...Book.typeDefs],
    // Combine the Query mutationResolvers with the Book mutationResolvers
    resolvers: merge(resolvers, Book.resolvers),
    schemaDirectives: Book.schemaDirectives
};
```

And `book.js`:
```JavaScript
const {CommonEntities: {commonEntityInterface, upperCaseDirective}} = require('@enigmatis/polaris');

// Define the Book type schema
const Book = `
    type Book implements CommonEntity {
        id: ID!
        creationDate: Date,
        lastUpdateDate: Date,
        dataVersion: Int!,
        title: String @upper,
        author: String
    }
`;

// Get the Book's mutationResolvers
const resolvers = require('../../resolvers/bookResolvers');

module.exports = {
    typeDefs: [Book, ...commonEntityInterface.typeDefs, ...upperCaseDirective.typeDefs],
    resolvers: resolvers,
    schemaDirectives: upperCaseDirective.schemaDirectives
};
```

Where CommonEntities are entities supplied by Polaris Engine and contain some default interface for entities, or common directives you can use in your GraphQL service.
