import { getModelCreator, RepositoryModel } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { Author, authorSchema } from './author-model';

export interface Book extends RepositoryModel {
    id: string;
    title: string;
    author: Author;
    dataVersion: number;
}

export const bookSchema: Schema = new Schema({
    id: String,
    title: String,
    author: authorSchema,
    dataVersion: Number,
});

export const BookModelPerReality = getModelCreator<Book>('book', bookSchema);
