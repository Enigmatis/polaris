import { RepositoryEntity } from '../../../../../src/main';

export interface Author extends RepositoryEntity {
    testId: string;
    id: string;
    firstName: string;
    lastName: string;
}
