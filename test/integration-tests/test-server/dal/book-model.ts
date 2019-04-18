import { getModelCreator, RepositoryModel } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';

export interface Book extends RepositoryModel {
    id: string;
    title: string;
    author: string;
    otherBook: Book;
    dataVersion: number;
}

export const bookSchema: Schema = new Schema({
    id: String,
    title: String,
    author: String,
    otherBook: Object,
    dataVersion: Number,
});

export const BookModelPerReality = getModelCreator<Book>('book', bookSchema);
