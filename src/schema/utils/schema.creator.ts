import { IResolvers, ITypeDefinitions } from 'graphql-tools';
import { injectable, multiInject } from 'inversify';
import 'reflect-metadata';
import { InjectableResolver, InjectableType } from '../../common/injectable-interfaces';
import { POLARIS_TYPES } from '../../inversion-of-control/polaris-types';

export interface SchemaCreator {
    generateSchema(): { def: ITypeDefinitions; resolvers: IResolvers };
}

@injectable()
export class PolarisSchemaCreator implements SchemaCreator {
    private types: InjectableType[];
    private resolvers: InjectableResolver[];

    constructor(
        @multiInject(POLARIS_TYPES.InjectableType) types: InjectableType[],
        @multiInject(POLARIS_TYPES.InjectableResolver) resolvers: InjectableResolver[],
    ) {
        this.types = types;
        this.resolvers = resolvers;
    }

    public generateSchema(): { def: ITypeDefinitions; resolvers: IResolvers } {
        const schemaDefinition = `schema {query: Query, mutation: Mutation}`;
        const definitions = [schemaDefinition, ...this.types.map<string>(x => x.definition())];
        const resolverObjects = this.resolvers.map(x => x.resolver());

        return { def: definitions, resolvers: Object.assign({}, ...resolverObjects) };
    }
}
