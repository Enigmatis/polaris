import { graphqlRequest } from '../test-server/client';

const headers = { 'reality-id': 1 };
const createBookMutation = `mutation createBook ($book:BookInput!) {createBook(book:$book){testId}}`;
const updateBookMutation = `mutation updateBook ($bookId:String!, $update:UpdateBookInput) {
         updateBook(bookId: $bookId, update: $update){ title }}`;

const findBookQuery = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;
const defaultBookVariables = (title: string, testId: string) => ({ author: 'chen', title, testId });

describe('mutation tests', () => {
    test('create book, book is created ', async () => {
        const id = '5';
        const title = 'book';
        await graphqlRequest(createBookMutation, headers, {
            book: defaultBookVariables(title, id),
        });
        const response: any = await graphqlRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById.title).toEqual(title);
        await graphqlRequest(deleteBookMutation, headers, { bookId: id });
    });
    test('update book, book is updated ', async () => {
        const id = '6';
        await graphqlRequest(createBookMutation, headers, {
            book: defaultBookVariables('book', id),
        });
        const updatedTitle = 'book updated';
        await graphqlRequest(updateBookMutation, headers, {
            bookId: id,
            update: { title: updatedTitle },
        });
        const response: any = await graphqlRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById.title).toEqual(updatedTitle);
        await graphqlRequest(deleteBookMutation, headers, { bookId: id });
    });

    test('delete book, book is deleted ', async () => {
        const id = '7';
        await graphqlRequest(createBookMutation, headers, {
            book: defaultBookVariables('book', id),
        });
        const result = await graphqlRequest(deleteBookMutation, headers, { bookId: id });
        const response: any = await graphqlRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById).toBeNull();
    });
});
