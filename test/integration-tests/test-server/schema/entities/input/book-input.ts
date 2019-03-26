import { provide } from 'inversify-binding-decorators';
import { InjectableType, POLARIS_TYPES } from '../../../../../../src/main';

@provide(POLARIS_TYPES.InjectableType)
export class BookInput implements InjectableType {
    definition = `input BookInput{
                     id: ID!        
                     title: String,
                     author: String
                 },
                 input BookCreationInput{
                    title:String,
                    author:String
                 }`;
}
