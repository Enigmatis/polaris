import { createDefaultBook, deleteDefaultBook, graphqlRequest } from '../test-server/client';

const headers = { 'reality-id': 1 };

describe('query tests', () => {
    test('fetch single book', async () => {
        const title = 'first';
        const id = await createDefaultBook(title, headers);
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRequest(queryBook, headers, { bookId: id });
        expect(response.bookById.title).toEqual(title);
        await deleteDefaultBook(id, headers);
    });
    test('fetch all books', async () => {
        const bookTitles = ['first', 'second', 'third', 'fourth', 'fifth'];
        for (const title of bookTitles) {
            await createDefaultBook(title, headers);
        }
        const queryBook = `query{books{title}}`;
        const response: any = await graphqlRequest(queryBook, headers, {});
        const responseTitles = [];
        for (const book of response.books) {
            responseTitles.push(book.title);
        }
        expect(responseTitles.sort()).toEqual(bookTitles.sort());
    });
});
