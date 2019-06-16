import { getModelCreator } from '@enigmatis/mongo-driver';
import { PolarisRequestHeaders } from '@enigmatis/utills';
import { graphQLRequest } from '../test-server/client';
import { Author, authorSchema } from '../test-server/dal/author-model';
import { Book, bookSchema } from '../test-server/dal/book-model';
import { startTestServer, stopTestServer } from '../test-server/run-test';
import { TestServer } from '../test-server/server';

const titles = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async (headers: PolarisRequestHeaders) => {
    const books = [];
    const author = await getModelCreator<Author>('author', authorSchema)({ headers }).create({
        testId: 0,
        firstName: 'Foo',
        lastName: 'Bar',
    });
    for (let i = 0; i < titles.length; i++) {
        books.push({ title: titles[i], testId: i, author });
    }
    await getModelCreator<Book>('book', bookSchema)({ headers }).create(books);
};

const requestHeaders = { 'reality-id': 1 };
let testServer: TestServer;
beforeEach(async () => {
    testServer = new TestServer();
    await startTestServer(testServer.server);
    await prepareDb({ realityId: 1 });
});

afterEach(() => {
    return stopTestServer(testServer.server);
});

describe('query tests', () => {
    test('fetch single book', async () => {
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        for (let i = 0; i < titles.length; i++) {
            const response: any = await graphQLRequest(queryBook, requestHeaders, {
                bookId: i.toString(),
            });
            expect(response.bookById.title).toEqual(titles[i]);
        }
    });
    test('fetch all books', async () => {
        const queryBook = `query{books{title}}`;
        const response: any = await graphQLRequest(queryBook, requestHeaders, {});
        const responseTitles = [];
        for (const book of response.books) {
            responseTitles.push(book.title);
        }
        expect(responseTitles.sort()).toEqual(titles.sort());
    });
});
