import "reflect-metadata";
import {buildProviderModule, provide} from "inversify-binding-decorators";
import {Container, multiInject} from "inversify";
import {merge} from 'lodash';
import {InjectableResolver, InjectableType} from "../../common/injectableInterfaces";
import {IResolvers, ITypeDefinitions} from 'graphql-tools';

export interface ISchemaCreator {
    generateSchema(): { def: ITypeDefinitions, resolvers: IResolvers };
}

@provide("ISchemaCreator")
export class SchemaCreator implements ISchemaCreator {
    private types: InjectableType[];
    private resolvers: InjectableResolver[];

    public constructor(
        @multiInject("InjectableType") types: InjectableType[],
        @multiInject("InjectableResolver") resolvers: InjectableResolver[]) {
        this.types = types;
        this.resolvers = resolvers;
    };

    generateSchema(): { def: ITypeDefinitions, resolvers: IResolvers } {
        let schemaDefinition = `schema {query: Query, mutation: Mutation}`;
        let definitions = [schemaDefinition, ...this.types.map<string>(x => x.definition())];
        let resolverObjects = this.resolvers.map(x =>
            x.resolver()
        );

        let resolvers = this.mergeObjectsArray(resolverObjects);

        return {def: definitions, resolvers: resolvers};
    }

    private mergeObjectsArray(objects: IResolvers[]): IResolvers {
        let merged = {};
        for (let i = 0; i < objects.length; i++) {
            Object.keys(objects[i]).forEach((key) => {
                merged[key] = objects[i][key];
            });
        }

        return merged;
    }
}

let container = new Container();
container.load(buildProviderModule());