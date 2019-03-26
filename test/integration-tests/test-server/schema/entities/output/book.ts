import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class Book implements InjectableType {
    definition = `
             type Book implements CommonEntity {
                 id: ID!
                 creationDate: String,
                 lastUpdateDate: String,
                 dataVersion: Int!,
                 title: String,
                 author: String,
                 realityId: Int!
             }
         `;
}
