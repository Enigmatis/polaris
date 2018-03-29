const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const path = require('path');

// initialize the app
function startGraphQLServer(schemaObject, port) {
    const schema = makeExecutableSchema(schemaObject);
    const app = express();

// create endpoints
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
    app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
    app.get('/voyager', function (req, res) {
        res.sendFile(path.join(__dirname, '/voyager/index.html'))
    });

// run server
    app.listen(port, () => {
        console.log('POLARIS engine v1.0.0 is starting your server . . .');
        console.log('----------------------------------------------------------');
        console.log('GraphQL endpoint is now running at: http://localhost:' + port + '/graphql');
        console.log('GraphiQL is now running at: http://localhost:' + port + '/graphiql');
        console.log('Voyager is not running at: http://localhost:' + port + '/voyager');
    });
}

module.exports = {startGraphQLServer: startGraphQLServer};