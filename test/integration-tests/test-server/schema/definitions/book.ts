import { RepositoryEntity } from '../../../../../src/main';
import { Author } from './author';

export interface Book extends RepositoryEntity {
    testId: string;
    id: string;
    title: string;
    author: Author;
}
