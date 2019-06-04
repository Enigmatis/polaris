import { PolarisRequestHeaders } from '@enigmatis/utills';
import { graphqlRawRequest, graphqlRequest } from '../test-server/client';
import { BookModelPerReality } from '../test-server/dal/book-model';
import { finish, init } from '../test-server/run-test';
export const titles = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async (headers: PolarisRequestHeaders) => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ author: 'arik', title: titles[i], testId: i, dataVersion: i + 1 });
    }
    await BookModelPerReality({ headers }).create(books);
};

const requestHeaders = { 'reality-id': 1, 'data-version': 1 };

beforeEach(async () => {
    await init();
    await prepareDb({ realityId: 1 });
});

afterEach(() => {
    return finish();
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

        const result: any = await graphqlRequest(queryBookStartsWith, requestHeaders, {});
        const idToDelete = result.booksStartsWith[0].testId;
        const expectedIrrelevantId = result.booksStartsWith[0].id;
        await graphqlRequest(deleteBookMutation, { 'reality-id': 1 }, { bookId: idToDelete });
        const { extensions }: any = await graphqlRawRequest(queryBookStartsWith, requestHeaders);

        expect(
            extensions.irrelevantEntities.booksStartsWith.includes(expectedIrrelevantId),
        ).toBeTruthy();
    }, 300000);
});
