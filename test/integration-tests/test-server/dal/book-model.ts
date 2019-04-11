import { getModelCreator, RepositoryModel } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';

export interface Book extends RepositoryModel {
    title: string;
    author: string;
    otherBook: Book;
    dataVersion: number;
}

const bookSchema: Schema = new Schema({
    title: String,
    author: String,
    otherBook: Object,
    dataVersion: Number,
});

export const BookModelPerReality = getModelCreator<Book>('book', bookSchema);
