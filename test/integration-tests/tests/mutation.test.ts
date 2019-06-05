import { graphQLRequest } from '../test-server/client';
import { finish, init } from '../test-server/run-test';

const headers = { 'reality-id': 1 };
const createBookMutation = `mutation createBook ($book:BookInput!) {createBook(book:$book){testId}}`;
const updateBookMutation = `mutation updateBook ($bookId:String!, $update:UpdateBookInput) {
         updateBook(bookId: $bookId, update: $update){ title }}`;

const findBookQuery = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;
const defaultBookVariables = (title: string, testId: string) => ({ title, testId });

beforeEach(() => {
    return init();
});

afterEach(() => {
    return finish();
});

describe('mutation tests', () => {
    test('create book, book is created ', async () => {
        const id = '1';
        const title = 'book';
        await graphQLRequest(createBookMutation, headers, {
            book: defaultBookVariables(title, id),
        });
        const response: any = await graphQLRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById.title).toEqual(title);
        await graphQLRequest(deleteBookMutation, headers, { bookId: id });
    });
    test('update book, book is updated ', async () => {
        const id = '1';
        await graphQLRequest(createBookMutation, headers, {
            book: defaultBookVariables('book', id),
        });
        const updatedTitle = 'book updated';
        await graphQLRequest(updateBookMutation, headers, {
            bookId: id,
            update: { title: updatedTitle },
        });
        const response: any = await graphQLRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById.title).toEqual(updatedTitle);
        await graphQLRequest(deleteBookMutation, headers, { bookId: id });
    });

    test('delete book, book is deleted ', async () => {
        const id = '1';
        await graphQLRequest(createBookMutation, headers, {
            book: defaultBookVariables('book', id),
        });
        await graphQLRequest(deleteBookMutation, headers, { bookId: id });
        const response: any = await graphQLRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById).toBeNull();
    });
});
