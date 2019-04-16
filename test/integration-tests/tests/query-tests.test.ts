import { graphQLRequest } from '../test-server/client';
import { firstRealityTitles } from '../test-server/db-preparation';

const headers = { 'reality-id': 1 };

describe('query tests', () => {
    test('fetch single book', async () => {
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        for (let i = 0; i < firstRealityTitles.length; i++) {
            const response: any = await graphQLRequest(queryBook, headers, {
                bookId: i.toString(),
            });
            expect(response.bookById.title).toEqual(firstRealityTitles[i]);
        }
    });
    test('fetch all books', async () => {
        const queryBook = `query{books{title}}`;
        const response: any = await graphQLRequest(queryBook, headers, {});
        const responseTitles = [];
        for (const book of response.books) {
            responseTitles.push(book.title);
        }
        expect(responseTitles.sort()).toEqual(firstRealityTitles.sort());
    });
});
