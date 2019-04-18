import { graphQLRequest } from '../test-server/client';

const realityIdHeader = (realityId: any) => ({ 'reality-id': realityId });
const realityIdHeaderWithIncludeLinkedOper = (realityId: number) => ({
    'reality-id': realityId,
    'include-linked-oper': true,
});

describe.skip('reality tests', () => {
    test('fetch entities from specific reality', async () => {
        const queryBook = `query{books{realityId}}`;
        const realityId: number = 1;
        const response: any = await graphQLRequest(queryBook, realityIdHeader(realityId));
        const responseRealities = [];
        for (const book of response.books) {
            responseRealities.push(book.realityId);
        }
        const uniqueResponseRealities = [...new Set(responseRealities)];
        expect(uniqueResponseRealities.length).toBe(1);
        expect(uniqueResponseRealities).toContain(realityId);
    });

    test('fetch entities from an empty reality', async () => {
        const queryBook = `query{books{realityId}}`;
        const realityId: number = 999;
        const response: any = await graphQLRequest(queryBook, realityIdHeader(realityId));
        expect(response.books).toBeNull();
    });

    test('fetch entities without reality header', async () => {
        const queryBook = `query{books{title}}`;
        await expect(graphQLRequest(queryBook, undefined)).rejects.toThrow(
            'please provide reality-id header',
        );
    });

    test('fetch entities with invalid reality header', async () => {
        const queryBook = `query{books{title}}`;
        await expect(graphQLRequest(queryBook, realityIdHeader('oops'))).rejects.toThrow(
            'Unable to format headers',
        );
    });

    test('fetch entities from specific reality with linked oper entities', async () => {
        const queryBook = `query{books{realityId author{realityId}}}`;
        const realityId: number = 3;
        const response: any = await graphQLRequest(
            queryBook,
            realityIdHeaderWithIncludeLinkedOper(realityId),
        );
        const responseRealities = [];
        for (const book of response.books) {
            responseRealities.push(book.realityId);
        }
    });
});
