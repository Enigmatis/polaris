import { RepositoryEntity } from '../../../../../src/main';

export interface Book extends RepositoryEntity {
    testId: string;
    id: string;
    title: string;
    author: string;
    otherBook?: Book;
}
