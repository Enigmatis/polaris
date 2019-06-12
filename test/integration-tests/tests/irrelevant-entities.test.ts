import { getModelCreator } from '@enigmatis/mongo-driver';
import { PolarisRequestHeaders } from '@enigmatis/utills';
import { graphqlRawRequest, graphQLRequest } from '../test-server/client';
import { Book, bookSchema } from '../test-server/dal/book-model';
import { startTestServer, stopTestServer } from '../test-server/run-test';
import { TestServer } from '../test-server/server';

export const titles = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async (headers: PolarisRequestHeaders) => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ title: titles[i], testId: i, dataVersion: i + 1 });
    }
    await getModelCreator<Book>('book', bookSchema)({ headers }).create(books);
};

const requestHeaders = { 'reality-id': 1, 'data-version': 1 };

let testServer: TestServer;

beforeEach(async () => {
    testServer = new TestServer();
    await startTestServer(testServer.server);
    await prepareDb({ realityId: 1 });
});

afterEach(() => {
    return stopTestServer(testServer.server);
});

describe('irrelevant entities tests', () => {
    test('2 irrelevant entities not starting with f', async () => {
        const queryBook = `{
          booksStartsWith(startsWith:"f"){
            id,
            title
          }
        }`;
        const { extensions }: any = await graphqlRawRequest(queryBook, requestHeaders);

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
        const { extensions }: any = await graphqlRawRequest(queryBook, requestHeaders);

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
        const { data, extensions }: any = await graphqlRawRequest(queryBook, requestHeaders);
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
        const { extensions }: any = await graphqlRawRequest(queryBook, { 'reality-id': 1 });

        expect(extensions).not.toBeDefined();
    });

    test('deleted entity is in irrelevant entities', async () => {
        const queryBookStartsWith =
            'query{\n' +
            '  booksStartsWith(startsWith:"f"){\n' +
            '    testId\n' +
            '    id\n' +
            '  }\n' +
            '}';

        const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;

        const result: any = await graphQLRequest(queryBookStartsWith, requestHeaders);
        const idToDelete = result.booksStartsWith[0].testId;
        const expectedIrrelevantId = result.booksStartsWith[0].id;
        await graphQLRequest(deleteBookMutation, { 'reality-id': 1 }, { bookId: idToDelete });
        const { extensions }: any = await graphqlRawRequest(queryBookStartsWith, requestHeaders);

        expect(
            extensions.irrelevantEntities.booksStartsWith.includes(expectedIrrelevantId),
        ).toBeTruthy();
    });
});
