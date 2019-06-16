import { PolarisRequestHeaders } from '@enigmatis/utills';
import { graphqlRawRequest, graphQLRequest } from '../test-server/client';
import { BookModelPerReality } from '../test-server/dal/book-model';
import { startTestServer, stopTestServer } from '../test-server/run-test';

const titles = ['first', 'second', 'third', 'fourth', 'fifth'];

const prepareDb = async (headers: PolarisRequestHeaders) => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ title: titles[i], testId: i });
    }
    await BookModelPerReality({ headers }).create(books);
};

beforeEach(async () => {
    await startTestServer();
    await prepareDb({ realityId: 1 });
});

afterEach(() => {
    return stopTestServer();
});

describe('response headers tests', () => {
    test('query with reality id header and receive reality id header in response', async () => {
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRawRequest(
            queryBook,
            { 'reality-id': 1 },
            {
                bookId: '0',
            },
        );
        expect(response.headers).toBeDefined();
        expect(response.headers.get('reality-id')).toBe('1');
        expect(response.headers.get('request-id')).toBeDefined();
        expect(response.headers.get('oicd-claim-upn')).toBeNull();
    });

    test('query with custom request id header and receive it in response', async () => {
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRawRequest(
            queryBook,
            { 'reality-id': 1, 'request-id': '123' },
            {
                bookId: '0',
            },
        );
        expect(response.headers).toBeDefined();
        expect(response.headers.get('request-id')).toBe('123');
        expect(response.headers.get('oicd-claim-upn')).toBeNull();
    });

    test('query with upn header and receive it in response', async () => {
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRawRequest(
            queryBook,
            { 'reality-id': 1, 'oicd-claim-upn': '123' },
            {
                bookId: '0',
            },
        );
        expect(response.headers).toBeDefined();
        expect(response.headers.get('oicd-claim-upn')).toBe('123');
        expect(response.headers.get('request-id')).toBeDefined();
    });
});
