import { RepositoryEntity } from '../../../../../src/main';

export interface Author extends RepositoryEntity {
    id: string;
    firstName: string;
    lastName: string;
}
