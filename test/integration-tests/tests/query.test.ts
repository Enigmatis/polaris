import { PolarisRequestHeaders } from '@enigmatis/utills';
import { graphQLRequest } from '../test-server/client';
import { BookModelPerReality } from '../test-server/dal/book-model';
import { finish, init } from '../test-server/run-test';

const titles = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async (headers: PolarisRequestHeaders) => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ title: titles[i], testId: i });
    }
    await BookModelPerReality({ headers }).create(books);
};

const requestHeaders = { 'reality-id': 1 };

beforeEach(async () => {
    await init();
    await prepareDb({ realityId: 1 });
});

afterEach(() => {
    return finish();
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
