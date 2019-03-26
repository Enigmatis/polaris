import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { InjectableResolver, POLARIS_TYPES } from '../../../../../src/main';

const bible: any = {
    _doc: {
        _id: { id: '3' },
        title: 'the bible',
        author: 'god',
        dataVersion: 2,
        realityId: 0,
        creationDate: { date: '1.1.1' },
        lastUpdateDate: { date: '1.1.1' },
        deleted: false,
    },
};
const jurassicPark: any = {
    _doc: {
        _id: { id: '2' },
        title: 'Jurassic Park',
        author: 'Michael Crichton',
        dataVersion: 2,
        realityId: 1,
        creationDate: { date: '1.1.1' },
        lastUpdateDate: { date: '1.1.1' },
        otherBook: bible,
        deleted: false,
    },
};
const harryPotter: any = {
    _doc: {
        _id: { id: '1' },
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling',
        dataVersion: 5,
        otherBook: bible,
        creationDate: { date: '1.1.1' },
        lastUpdateDate: { date: '1.1.1' },
        realityId: 2,
        deleted: false,
    },
};
const www: any = {
    _doc: {
        _id: { id: '5' },
        title: 'w',
        author: 'k',
        dataVersion: 4,
        otherBook: jurassicPark,
        creationDate: { date: '1.1.1' },
        lastUpdateDate: { date: '1.1.1' },
        realityId: 2,
        deleted: false,
    },
};

export const books: any[] = [harryPotter, jurassicPark, bible, www];

@provide(POLARIS_TYPES.InjectableResolver)
export class QueryResolvers implements InjectableResolver {
    resolver(): any {
        return {
            Query: {
                books: () => {
                    return books;
                },
            },
        };
    }
}
