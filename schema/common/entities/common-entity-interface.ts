import { injectable } from 'inversify';
import 'reflect-metadata';
import { InjectableType } from '../../../common/injectable-interfaces';

@injectable()
export class CommonEntityInterface implements InjectableType {
    public definition(): string {
        return `interface CommonEntity{
        id: ID!
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!}`;
    }
}
