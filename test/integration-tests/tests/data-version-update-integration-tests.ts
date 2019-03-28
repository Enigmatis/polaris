import { graphqlRequest } from '../test-server/server';

describe('Data version update integration tests', () => {
    test('update heroes, check updated data version', async () => {
        jest.setTimeout(30000);
        const mutationCreate = `mutation foo{
          createBook(book:{author:"hh",title:"jjj",id:"gg"}){
            title
          }
        }`;
        const variables = {};
        await expect(
            graphqlRequest(mutationCreate, { 'reality-id': 12 }, variables),
        ).resolves.toEqual(variables);
        /*const variablesUpdate = {
            "bookId": "5",
            "update": {
                "title": 'what',
                "author": 'yu',
            }
        };
        const mutationUpdate = `mutation updateBook(bookId: String!, update: UpdateBookInput): Book{ id }}`;
        const updateBookRequest = graphqlRequest(mutationUpdate, {}, variablesUpdate);
        await expect(updateBookRequest).resolves.toEqual({
            books: [
                {title: "Harry Potter and the Sorcerer's stone"},
                {title: 'Jurassic Park'},
                {title: 'the bible'},
                {title: 'w'},
            ],
        });*/
    });
});
