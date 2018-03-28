# Polaris
A node.js express engine for creating GraphQL server easily, with base standardization and common types

## Getting Started
This module exposes 2 fields: RunGraphQLServer method and the CommonEntities object.
Every "polaris" entity is an object with the following fields:
- typeDefs: string representation of the type definitions required by this entity.
-- for example, a Book entity definition will be supplied to typeDefs. ``type Book { id: string, name: string }``
- resolvers: an object that holds the resolver functions for this entity, as defined in GraphQL-Tools.
- schemaDirectives: an object that holds the directives functions for this entity, as defined in GraphQL-Tools.
The schema is a "polaris" entity by itself.

In order to run the server, you can use the following code:
```
const {RunGraphQLServer} = require('@vulcan/polaris');
const Schema = require('./schema/schema');
RunGraphQLServer(Schema, 3000);
```
Where schema is your executable schema as defined by GraphQL-Tools.
Attention - do not execute ``makeExecutableSchema(schema)`` - We will do this for you.
You should supply the schema before the making.