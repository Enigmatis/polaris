import { RepositoryEntity } from '../../../../../src/main';
import { Author } from './author';

export interface Book extends RepositoryEntity {
    id: string;
    title: string;
    author: Author;
}
