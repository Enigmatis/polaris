import { GraphQLClient } from 'graphql-request';

async function main() {
    const endpoint = 'http://localhost:4000/graphql';

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {},
    });

    const query = `{
    books(realityId: 0, includeOperational: true){
     title
    }
}`;

    const data = await graphQLClient.request(query);
}

main(); // .catch(error => console.error(error));
