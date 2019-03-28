import { getModelCreator, RepositoryModel } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';

export interface Book extends RepositoryModel {
    title: string;
    author: string;
}

const bookSchema: Schema = new Schema({
    title: String,
    author: String,
});

export const BookModelPerReality = getModelCreator<Book>('book', bookSchema);
