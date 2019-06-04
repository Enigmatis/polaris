import { graphqlRequest } from '../test-server/client';
import { Book, bookSchema } from '../test-server/dal/book-model';

const headers = { 'reality-id': 1 };
const createBookMutation = `mutation createBook ($book:BookInput!) {createBook(book:$book){id}}`;
const updateBookMutation = `mutation updateBook ($bookId:String!, $update:UpdateBookInput) {
         updateBook(bookId: $bookId, update: $update){ title }}`;

const findBookQuery = `query bookById ($bookId:String!) {bookById(bookId:$bookId){title}}`;
const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title }}`;
const defaultBookVariables = (title: string, id: string) => ({ author: 'chen', title, id });

describe('soft delete tests', () => {
    test('delete author, should return soft deleted entities is false, return book without author', async () => {
        // bookModelPerReality = getModelCreator<Book>('book', bookSchema,{
        //     allowSoftDelete: true,
        // softDeleteReturnEntities: false});
        const id = '1';
        await graphqlRequest(createBookMutation, headers, {
            book: defaultBookVariables('book', id),
        });
        await graphqlRequest(deleteBookMutation, headers, { bookId: id });
        const response: any = await graphqlRequest(findBookQuery, headers, { bookId: id });
        expect(response.bookById).toBeNull();
    });
    // test('delete book, should return soft deleted entities is false, return null when fetching the same book', async () => {});
    // test('delete book, allow soft delete is false, return null when fetching the same book', async () => {});
    // test('delete author, should return soft deleted entities is true, return the author that was deleted', async () => {});
});
