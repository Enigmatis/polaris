import { graphQLRequest } from '../test-server/client';
import { AuthorModelPerReality } from '../test-server/dal/author-model';
import { BookModelPerReality } from '../test-server/dal/book-model';
import { finish, init } from '../test-server/run-test';

const dbRealityIdHeader = (realityId: any) => ({ realityId });
const requestRealityIdHeader = (realityId: any) => ({ 'reality-id': realityId });
const realityIdHeaderWithIncludeLinkedOper = (realityId: number) => ({
    'reality-id': realityId,
    'include-linked-oper': true,
});

export const firstRealityTitles: string[] = ['first', 'second', 'third', 'fourth', 'fifth'];
const secondRealityTitles: string[] = ['1st', '2nd'];

const prepareDb = async () => {
    const author = await AuthorModelPerReality({ headers: dbRealityIdHeader(0) }).create({
        id: 0,
        firstName: 'Foo',
        lastName: 'Bar',
    });

    await BookModelPerReality({ headers: dbRealityIdHeader(1) }).create(
        await generateBookArrayWithIds(firstRealityTitles),
    );

    await BookModelPerReality({ headers: dbRealityIdHeader(2) }).create(
        generateBookArrayWithIds(secondRealityTitles),
    );

    await BookModelPerReality({ headers: dbRealityIdHeader(3) }).create({
        id: 0,
        title: 'Shadow Realm',
        author,
    });
};

const generateBookArrayWithIds = (titleArray: string[]) => {
    const books = [];
    for (let i = 0; i < titleArray.length; i++) {
        books.push({ testId: i, title: titleArray[i], dataVersion: i + 1 });
    }
    return books;
};

beforeEach(async () => {
    await init();
    await prepareDb();
});

afterEach(() => {
    return finish();
});

describe('reality tests', () => {
    test('fetch entities from specific reality', async () => {
        const queryBook = `query{books{realityId}}`;
        const realityId: number = 1;
        const response: any = await graphQLRequest(queryBook, requestRealityIdHeader(realityId));
        const responseRealities = [];
        for (const book of response.books) {
            responseRealities.push(book.realityId);
        }
        const uniqueResponseRealities = [...new Set(responseRealities)];
        expect(uniqueResponseRealities.length).toBe(1);
        expect(uniqueResponseRealities).toContain(realityId);
    });

    test('fetch entities from an empty reality', async () => {
        const emptyResult: [] = [];
        const queryBook = `query{books{realityId}}`;
        const realityId: number = 999;
        const response: any = await graphQLRequest(queryBook, requestRealityIdHeader(realityId));
        expect(response.books).toEqual(emptyResult);
    });

    test('fetch entities without reality header', async () => {
        const queryBook = `query{books{title}}`;
        await expect(graphQLRequest(queryBook, undefined)).rejects.toThrow(
            'please provide reality-id header',
        );
    });

    test('fetch entities with invalid reality header', async () => {
        const queryBook = `query{books{title}}`;
        await expect(graphQLRequest(queryBook, requestRealityIdHeader('oops'))).rejects.toThrow(
            'Unable to format headers',
        );
    });

    test('fetch sub entities from specific reality with linked oper entities', async () => {
        const queryBook = `query{books{realityId author{realityId}}}`;
        const realityId: number = 3;
        const response: any = await graphQLRequest(
            queryBook,
            realityIdHeaderWithIncludeLinkedOper(realityId),
        );
        const responseRealities = [];
        const responseSubRealities = [];
        for (const book of response.books) {
            responseRealities.push(book.realityId);
            responseSubRealities.push(book.author.realityId);
        }
        const uniqueResponseRealities = [...new Set(responseRealities)];
        const uniqueResponseSubRealities = [...new Set(responseSubRealities)];
        expect(uniqueResponseRealities.length).toBe(1);
        expect(uniqueResponseRealities).toContain(realityId);
        expect(uniqueResponseSubRealities).toContain(0);
    });
});
