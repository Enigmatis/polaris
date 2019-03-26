import { RepositoryEntity } from '../../../../../src/main';

export interface Book extends RepositoryEntity {
    id: string;
    title: string;
    author: string;
    otherBook?: Book;
}
