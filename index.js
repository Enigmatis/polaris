const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

// initialize the app
function startGraphQLServer(schemaObject, port) {
    const schema = makeExecutableSchema(schemaObject);
    const app = express();

// create endpoints
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

// run server
    app.listen(port, () => {
        console.log('POLARIS engine v1.0.0 is starting your server . . .');
        console.log('----------------------------------------------------------');
        console.log('GraphQL endpoint is now running at: http://localhost:'+port+'/graphql');
        console.log('GraphiQL is now running at: http://localhost:'+port+'/graphiql');
    });
}

module.exports = {startGraphQLServer: startGraphQLServer};