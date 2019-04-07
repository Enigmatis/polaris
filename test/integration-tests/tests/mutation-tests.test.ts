import { createDefaultBook, deleteDefaultBook, graphqlRequest } from '../test-server/client';

const headers = { 'reality-id': 1 };
const updateBookMutation = `mutation updateBook ($bookId:String!, $update:UpdateBookInput) {
         updateBook(bookId: $bookId, update: $update){ title }}`;

const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;

describe('mutation tests', () => {
    test('update book, book is updated ', async () => {
        const id = await createDefaultBook('book', headers);
        const updatedTitle = 'book updated';
        await graphqlRequest(updateBookMutation, headers, {
            bookId: id,
            update: { title: updatedTitle },
        });
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRequest(queryBook, headers, { bookId: id });
        expect(response.bookById.title).toEqual(updatedTitle);
        await deleteDefaultBook(id, headers);
    });

    test('delete book, book is deleted ', async () => {
        jest.setTimeout(500000);
        const id = await createDefaultBook('first', headers);
        await graphqlRequest(deleteBookMutation, headers, { bookId: id });
        const queryBook = `query bookById ($bookId:String!){bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRequest(queryBook, headers, { bookId: id });
        expect(response.bookById).toBeNull();
    });
});
