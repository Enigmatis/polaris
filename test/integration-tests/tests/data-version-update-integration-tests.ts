/*import { graphqlRequest } from '../test-server/server';

describe('Data version update integration tests', () => {
    test('update heroes, check updated data version', async () => {
        const mutation = `mutation updateBook ($id: ID!, $title: String!, $author: String!) {
                updateBook(id: $id, title: $title, author: $author) { id }}`;
        const variables = {
            id: 5,
            title: 'hmmm',
            author: 'yu',
        };
        const createBookRequest = graphqlRequest(mutation, {}, variables);
        const updateBookRequest = graphqlRequest(mutation, {}, variables);
        await expect(graphqlRequest(mutation, {}, variables)).resolves.toEqual({
            books: [
                { title: "Harry Potter and the Sorcerer's stone" },
                { title: 'Jurassic Park' },
                { title: 'the bible' },
                { title: 'w' },
            ],
        });
    });
});
*/
