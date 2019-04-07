import { createDefaultBook, deleteDefaultBook, graphqlRequest } from '../test-server/client';

const headers = { 'reality-id': 1 };
const updateTwoBooksMutation = `mutation updateBook ($bookId1:String!, $bookId2:String!, $update1:UpdateBookInput
         , $update2:UpdateBookInput) {
         a:updateBook(bookId: $bookId1, update: $update1){ title }
         b:updateBook(bookId: $bookId2, update: $update2){ title }}`;

const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;

describe('mutation tests', () => {
    test('update book, book is updated ', async () => {
        const id = await createDefaultBook('first', headers);
        const id2 = await createDefaultBook('second', headers);
        const updatedTitle = 'first updated';
        const updatedTitle2 = 'second updated';
        await graphqlRequest(updateTwoBooksMutation, headers, {
            bookId1: id,
            bookId2: id2,
            update1: { title: updatedTitle },
            update2: { title: updatedTitle2 },
        });
        const queryBook = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
        const response: any = await graphqlRequest(queryBook, headers, { bookId: id });
        const response2: any = await graphqlRequest(queryBook, headers, { bookId: id2 });
        expect(response.bookById.title).toEqual(updatedTitle);
        expect(response2.bookById.title).toEqual(updatedTitle2);
        await deleteDefaultBook(id, headers);
        await deleteDefaultBook(id2, headers);
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
