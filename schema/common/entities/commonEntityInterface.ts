import "reflect-metadata";
import {InjectableType} from "../../../common/injectableInterfaces";
import {injectable} from "inversify";

@injectable()
export class CommonEntityInterface implements InjectableType {
    definition(): string {
        return `interface CommonEntity{
        id: ID!
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!}`;
    }
}