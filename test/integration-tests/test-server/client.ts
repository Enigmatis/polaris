import { GraphQLClient } from 'graphql-request';
import * as polarisPropertiesPath from './config/properties.json';

export const url = `http://localhost:${polarisPropertiesPath.port}${
    polarisPropertiesPath.endpoint
}`;
export async function graphqlRequest(data: string, headers: any, variables: any) {
    const graphQLClient = new GraphQLClient(url, {
        headers,
    });
    const result = await graphQLClient.request(data, variables);
    return result;
}

export async function createDefaultBook(title: string, headers: any) {
    const defaultBookVariables = { author: 'chen', title, id: '1234' };
    const createBookMutation = `mutation createBook ($book:BookInput) {createBook(book:$book){id}}`;
    const result: any = await graphqlRequest(createBookMutation, headers, {
        book: defaultBookVariables,
    });
    return result.createBook.id;
}

export async function deleteDefaultBook(id: string, headers: any) {
    const deleteBookMutation = `mutation deleteBook ($bookId:String!) {deleteBook(bookId:$bookId){id}}`;
    await graphqlRequest(deleteBookMutation, headers, { bookId: id });
}
