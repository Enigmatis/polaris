const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const path = require('path');
const cors = require('cors');

// initialize the app
function createEndpoints(enableCrossOrigin, app, schema, enableGraphiql, enableVoyager) {
    if (enableCrossOrigin) {
        app.use(cors());
    }

    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

    if (enableGraphiql) {
        app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
    }
    if (enableVoyager) {
        app.get('/voyager', function (req, res) {
            res.sendFile(path.join(__dirname, '/voyager/index.html'))
        });
    }
}

function listen(app, port, enableGraphiql, enableVoyager, enableCrossOrigin) {
    app.listen(port, () => {
        console.log('POLARIS graphql server is now running');
        console.log('----------------------------------------------------------');
        console.log('GraphQL endpoint is now running at: http://localhost:' + port + '/graphql');
        if (enableGraphiql) {
            console.log('GraphiQL is now running at: http://localhost:' + port + '/graphiql');
        }
        if (enableVoyager) {
            console.log('Voyager is now running at: http://localhost:' + port + '/voyager');
        }
        if (enableCrossOrigin) {
            console.log('Cross Origin is enabled.');
        }
    });
}

function startGraphQLServer(schemaObject, port, enableGraphiql = true, enableVoyager = true, enableCrossOrigin = true) {
    const schema = makeExecutableSchema(schemaObject);
    const app = express();

    createEndpoints(enableCrossOrigin, app, schema, enableGraphiql, enableVoyager);

    listen(app, port, enableGraphiql, enableVoyager, enableCrossOrigin);
}

module.exports = {startGraphQLServer: startGraphQLServer};