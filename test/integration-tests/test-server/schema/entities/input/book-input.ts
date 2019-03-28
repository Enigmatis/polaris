import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class BookInput implements InjectableType {
    definition = `input BookInput{
                     id: ID!        
                     title: String,
                     author: String
                 },
                 input UpdateBookInput{
                    title:String,
                    author:String
                 }`;
}
