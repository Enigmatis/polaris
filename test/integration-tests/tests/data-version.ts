/*import { graphqlRequest } from '../test-server/server';

describe('GraphQL', () => {
    test('titles', async () => {
        const query2 = `{books{title}}`;
        await expect(graphqlRequest(query2, {}, {})).resolves.toEqual({
            books: [
                { title: "Harry Potter and the Sorcerer's stone" },
                { title: 'Jurassic Park' },
                { title: 'the bible' },
                { title: 'w' },
            ],
        });
    });
    test('dv', async () => {
        const query2 = `{books{title}}`;
        await expect(graphqlRequest(query2, { 'data-version': 2 }, {})).resolves.toEqual({
            books: [{ title: "Harry Potter and the Sorcerer's stone" }, { title: 'w' }],
        });
    });
    test('realityid', async () => {
        const query2 = `{books{title}}`;
        await expect(graphqlRequest(query2, { 'reality-id': 0 }, {})).resolves.toEqual({
            books: [{ title: 'the bible' }],
        });
    });
});
*/
