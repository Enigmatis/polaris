import { RepositoryModel, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { Author } from './author-model';

export interface Book extends RepositoryModel {
    testId: string;
    title: string;
    author: Author;
    dataVersion: number;
}

export const bookSchema: SchemaCreator = refNameCreator => {
    return new Schema({
        testId: String,
        title: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: refNameCreator('author'),
        },
        dataVersion: Number,
    });
};
