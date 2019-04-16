import { graphQLRequest } from '../test-server/client';

const realityIdHeader = (realityId: number) => ({ 'reality-id': realityId });

describe('reality tests', () => {
    const queryBook = `query{books{realityId}}`;
    test('fetch entities from specific reality', async () => {
        const realityId: number = 1;
        const response: any = await graphQLRequest(queryBook, realityIdHeader(realityId), {});
        const responseRealities = [];
        for (const book of response.books) {
            responseRealities.push(book.realityId);
        }
        const uniqueResponseRealities = [...new Set(responseRealities)];
        expect(uniqueResponseRealities.length).toBe(1);
        expect(uniqueResponseRealities).toContain(realityId);
    });

    test('fetch entities from non existing reality', async () => {
        const realityId: number = 999;
        const response: any = await graphQLRequest(queryBook, realityIdHeader(realityId), {});
        expect(response.books).toBeNull();
    });
});
