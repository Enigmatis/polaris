import { graphqlRawRequest } from '../test-server/client';

const headers = { 'reality-id': 1, 'data-version': 1 };

describe('irrelevant entities tests', () => {
    test('2 irrelevant entities not starting with f', async () => {
        const queryBook = `{
          booksStartsWith(startsWith:"f"){
            id,
            title
          }
        }`;
        const { extensions }: any = await graphqlRawRequest(queryBook, headers, {});

        expect(extensions.irrelevantEntities.booksStartsWith.length).toBe(2);
    });

    test('multiple queries entities not starting with f', async () => {
        const queryBook = `{
          a:booksStartsWith(startsWith:"f"){
            id,
            title
          }
          b:booksStartsWith(startsWith:"s"){
            id,
            title
          }
        }`;
        const { extensions }: any = await graphqlRawRequest(queryBook, headers, {});

        expect(extensions.irrelevantEntities.a.length).toBe(2);
        expect(extensions.irrelevantEntities.b.length).toBe(3);
    });
    test('irrelevant id entities not in response', async () => {
        const queryBook = `{
          booksStartsWith(startsWith:"f"){
            id,
            title
          }
        }`;
        const { data, extensions }: any = await graphqlRawRequest(queryBook, headers, {});
        for (const entity of data.booksStartsWith) {
            expect(extensions.irrelevantEntities.booksStartsWith.includes(entity.id)).toBeFalsy();
        }
    });

    test('no irrelevant when no data version is sent', async () => {
        const queryBook = `{
          booksStartsWith(startsWith:"f"){
            id,
            title
          }
        }`;
        const { extensions }: any = await graphqlRawRequest(queryBook, { 'reality-id': 1 }, {});

        expect(extensions).not.toBeDefined();
    });
});
