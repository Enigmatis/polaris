import { getModelCreator } from '@enigmatis/mongo-driver';
import { graphQLRequest } from '../test-server/client';
import { authorSchema } from '../test-server/dal/author-model';
import { bookSchema } from '../test-server/dal/book-model';
import { startTestServer, stopTestServer } from '../test-server/run-test';
import { TestServer } from '../test-server/server';

const dbRealityIdHeader = (realityId: any) => ({ realityId });
const requestRealityIdHeader = (realityId: any) => ({ 'reality-id': realityId });
const realityIdHeaderWithIncludeLinkedOper = (realityId: number) => ({
    'reality-id': realityId,
    'include-linked-oper': true,
});

export const titleArray: string[] = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async () => {
    const firstAuthor = await getModelCreator('author', authorSchema)({
        headers: dbRealityIdHeader(0),
    }).create({
        testId: 0,
        firstName: 'Foo',
        lastName: 'Bar',
    });

    const secondAuthor = await getModelCreator('author', authorSchema)({
        headers: dbRealityIdHeader(2),
    }).create({
        testId: 0,
        firstName: 'Hello',
        lastName: 'World',
    });

    const books = [];
    for (let i = 0; i < titleArray.length; i++) {
        books.push({ testId: i, title: titleArray[i], dataVersion: i + 1 });
    }
    await getModelCreator('book', bookSchema)({ headers: dbRealityIdHeader(1) }).create(books);

    await getModelCreator('book', bookSchema)({ headers: dbRealityIdHeader(3) }).create({
        testId: 0,
        title: 'Shadow Realm',
        author: firstAuthor,
    });

    await getModelCreator('book', bookSchema)({ headers: dbRealityIdHeader(4) }).create({
        testId: 0,
        title: 'Lorem Ipsum',
        author: secondAuthor,
    });
};
let testServer: TestServer;

beforeEach(async () => {
    testServer = new TestServer();
    await startTestServer(testServer.server);
    await prepareDb();
});

afterEach(() => {
    return stopTestServer(testServer.server);
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

    test('fetch entities from a non existing reality', async () => {
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
            '"reality-id" must be a number',
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

    test('fetch sub entities from specific reality without linked oper entities', async () => {
        const queryBook = `query{books{realityId title author{realityId}}}`;
        const realityId: number = 4;
        const response: any = await graphQLRequest(
            queryBook,
            realityIdHeaderWithIncludeLinkedOper(realityId),
        );
        for (const book of response.books) {
            expect(book.author).toBeNull();
        }
    });

    test('fetch entities from unsupported reality', async () => {
        const queryBook = `query{books{realityId}}`;
        const realityId: number = 1337;
        await expect(graphQLRequest(queryBook, requestRealityIdHeader(realityId))).rejects.toThrow(
            `The requested reality-id ${realityId} is not supported!`,
        );
    });
});
