import glob = require('glob');
import "reflect-metadata";
import {provide} from "inversify-binding-decorators";
import {Container, inject, multiInject} from "inversify";
import {buildProviderModule} from "inversify-binding-decorators";
import {merge} from 'lodash';
import PolarisTypeWrapper = require("../../common/polarisTypeWrapper");
import {InjectableResolver, InjectableType} from "../../common/injectableInterfaces";

export interface ISchemaCreator {
    generateSchema(): PolarisTypeWrapper;
}

@provide("ISchemaCreator")
export class SchemaCreator implements ISchemaCreator {
    private types: InjectableType[];
    private resolvers: InjectableResolver[];

    public constructor(@multiInject("InjectableType") types: InjectableType[],
                       @multiInject("InjectableResolver") resolvers: InjectableResolver[]) {
        this.types = types;
        this.resolvers = resolvers;
    };

    generateSchema(): PolarisTypeWrapper {
        let schemaDefinition = `schema {query: Query, mutation: Mutation}`;
        let definitions = [schemaDefinition, ...this.types.map<string>(x => x.definition())];
        let resolvers = merge(this.resolvers.map(x =>
            x.resolver()
        ));

        return new PolarisTypeWrapper(definitions, resolvers);
    }

    private requireAllInFolder(pathToDir: string): void {
        let files = glob.sync(pathToDir);
        files.forEach(function (file) {
            file = file.replace(/\.[^/.]+$/, "");
            require(file);
        });
    }
}

let container = new Container();
container.load(buildProviderModule());