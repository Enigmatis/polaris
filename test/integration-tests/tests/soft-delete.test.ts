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

const booksQuery = `query{books{testId}}`;

const deleteBookMutation = `mutation deleteBook ($bookId:String!) {
         deleteBook(bookId: $bookId){ title}}`;

const deleteAuthorMutation = `mutation deleteAuthor ($authorId:String!) {
         deleteAuthor(authorId: $authorId){ firstName }}`;

const defaultAuthor = {
    testId: '0',
    firstName: 'Foo',
    lastName: 'Bar',
};

const bookId = '0';

const prepareDb = async (softDeleteConfiguration?: SoftDeleteConfiguration) => {
    const context: PolarisBaseContext = {
        headers,
        softDeleteConfiguration,
        executionMetadata: { dataVersion: 0 },
    };
    const author = await getModelCreator<Author>('author', authorSchema)(context).create(
        defaultAuthor,
    );

    await getModelCreator<Book>('book', bookSchema)(context).create({
        testId: bookId,
        title: 'Shadow Realm',
        author,
    });

    await getModelCreator<Book>('book', bookSchema)(context).create({
        testId: '1',
        title: 'Harry Potter',
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
    test('delete sub entity, should return soft deleted entities is false, return entity without same entity', async () => {
        await prepareDb();
        const res = await graphQLRequest(deleteAuthorMutation, requestHeaders, {
            authorId: defaultAuthor.testId,
        });
        const response: any = await graphQLRequest(findBookQuery, requestHeaders, { bookId });
        expect(response.bookById.author).toBeNull();
        expect(response.bookById.testId).toEqual(bookId);
    });

    test('delete entity, should return soft deleted entities is false, return null when fetching the same entity', async () => {
        await prepareDb();
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const response: any = await graphQLRequest(findBookQuery, requestHeaders, { bookId });
        expect(response.bookById).toBeNull();
    });

    test('delete entity, allow soft delete is false and return deleted entities set to true, return null when fetching the same entity', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = {
            allowSoftDelete: false,
            softDeleteReturnEntities: true,
        };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId,
        });
        expect(responseDel.bookById).toBeNull();
    });

    test('delete entity, return soft deleted entities is true, return the entity that was deleted', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = { softDeleteReturnEntities: true };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        await graphQLRequest(deleteBookMutation, requestHeaders, { bookId });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId,
        });
        expect(responseDel.bookById.testId).toBe(bookId);
    });

    test('delete sub entity, return soft deleted entities is true, return the sub entity that was deleted', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = { softDeleteReturnEntities: true };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        await graphQLRequest(deleteAuthorMutation, requestHeaders, {
            authorId: defaultAuthor.testId,
        });
        const responseDel: any = await graphQLRequest(findBookQuery, requestHeaders, {
            bookId,
        });
        expect(responseDel.bookById.author.firstName).toBe(defaultAuthor.firstName);
    });

    test('delete entity, return soft deleted entities is true, return all of the entities', async () => {
        const softDeleteConfiguration: SoftDeleteConfiguration = { softDeleteReturnEntities: true };
        polarisContainer
            .rebind(POLARIS_TYPES.SoftDeleteConfiguration)
            .toConstantValue(softDeleteConfiguration);
        await prepareDb(softDeleteConfiguration);
        await graphQLRequest(deleteBookMutation, requestHeaders, {
            bookId,
        });
        const responseDel: any = await graphQLRequest(booksQuery, requestHeaders, {});
        expect(responseDel.books.find((book: any) => book.testId === bookId)).not.toBeUndefined();
    });

    test('delete entity, return soft deleted entities is false, dont return deleted entity', async () => {
        await prepareDb();
        await graphQLRequest(deleteBookMutation, requestHeaders, {
            bookId,
        });
        const responseDel: any = await graphQLRequest(booksQuery, requestHeaders, {});
        expect(responseDel.books.find((book: any) => book.testId === bookId)).toBeUndefined();
    });
});
