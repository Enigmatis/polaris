import { getModelCreator, RepositoryModel, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { Author } from './author-model';

export interface Book extends RepositoryModel {
    id: string;
    title: string;
    author: Author;
    dataVersion: number;
}

export const bookSchema: SchemaCreator = refNameCreator => {
    return new Schema({
        id: String,
        title: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: refNameCreator('author'),
        },
        dataVersion: Number,
    });
};

export const BookModelPerReality = getModelCreator<Book>('book', bookSchema);
