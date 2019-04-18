import { getModelCreator, RepositoryModel } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';

export interface Author extends RepositoryModel {
    id: string;
    firstName: string;
    lastName: string;
}

export const authorSchema: Schema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
});

export const AuthorModelPerReality = getModelCreator<Author>('author', authorSchema);
