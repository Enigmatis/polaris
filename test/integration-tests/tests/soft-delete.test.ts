import { getModelCreator } from '@enigmatis/mongo-driver';
import { PolarisBaseContext, SoftDeleteConfiguration } from '@enigmatis/utills';
import { polarisContainer } from '../../../src/inversion-of-control/container-manager';
import { POLARIS_TYPES } from '../../../src/inversion-of-control/polaris-types';
import { graphQLRequest } from '../test-server/client';
import { Author, authorSchema } from '../test-server/dal/author-model';
import { Book, bookSchema } from '../test-server/dal/book-model';
import { startTestServer, stopTestServer } from '../test-server/run-test';
import { TestServer } from '../test-server/server';

const headers = { realityId: 1 };

const findBookQuery = `query bookById ($bookId:String!) {bookById(bookId:$bookId){testId
author{ firstName }}}`;

const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title}}`;

const deleteAuthorMutation = `mutation deleteAuthor ($authorId:String!) {
         deleteAuthor(authorId: $authorId){ firstName }}`;
const defaultAuthor = {
    testId: 0,
    firstName: 'Foo',
    lastName: 'Bar',
};

const prepareDb = async (softDeleteConfiguration?: SoftDeleteConfiguration) => {
    const context: PolarisBaseContext = { headers, softDeleteConfiguration };
    const author = await getModelCreator<Author>('author', authorSchema)(context).create(
        defaultAuthor,
    );

    await getModelCreator<Book>('book', bookSchema)(context).create({
        testId: 0,
        title: 'Shadow Realm',
        author,
    });
};

const requestHeaders = { 'reality-id': 1 };

let testServer: TestServer;

beforeEach(async () => {
    testServer = new TestServer();
    await startTestServer(testServer.server);
});

afterEach(() => {
    return stopTestServer(testServer.server);
});

describe('soft delete tests', () => {
    test('delete author, should return soft deleted entities is false, return book without author', async () => {
        await prepareDb();
        const res = await graphQLRequest(deleteAuthorMutation, requestHeaders, { authorId: '0' });
        const response: any = await graphQLRequest(findBookQuery, requestHeaders, { bookId: '0' });
        expect(response.bookById.author).toBeNull();
        expect(response.bookById.testId).toEqual('0');
    });

    test('delete book, should return soft deleted entities is false, return null when fetching the same book', async () => {
        await prepareDb();
        const bookId = '0';
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const response: any = await graphQLRequest(findBookQuery, requestHeaders, { bookId });
        expect(response.bookById).toBeNull();
    });
    test('delete book, allow soft delete is false, return null when fetching the same book', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = {
            allowSoftDelete: false,
            softDeleteReturnEntities: true,
        };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        const bookId = '0';
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId,
        });
        expect(responseDel.bookById).toBeNull();
    });

    test('delete book, return not null', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = { softDeleteReturnEntities: true };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        const bookId = '0';
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId,
        });
        expect(responseDel.bookById.testId).toBe('0');
    });

    test('delete author, should return soft deleted entities is true, return the author that was deleted', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = { softDeleteReturnEntities: true };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        await graphQLRequest(deleteAuthorMutation, requestHeaders, { authorId: '0' });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId: '0',
        });
        expect(responseDel.bookById.author.firstName).toBe(defaultAuthor.firstName);
    });
});
