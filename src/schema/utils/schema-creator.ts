import { IResolvers, ITypeDefinitions } from 'graphql-tools';
import { inject, injectable, multiInject } from 'inversify';
import 'reflect-metadata';
import {
    InjectableResolver,
    InjectableType,
    PolarisServerConfig,
} from '../../common/injectable-interfaces';
import { POLARIS_TYPES } from '../../inversion-of-control/polaris-types';

export interface PolarisSchema {
    def: ITypeDefinitions;
    resolvers: IResolvers;
}

export interface SchemaCreator {
    generateSchema(): PolarisSchema;
}

@injectable()
export class PolarisSchemaCreator implements SchemaCreator {
    constructor(
        @multiInject(POLARIS_TYPES.InjectableType) private types: InjectableType[],
        @multiInject(POLARIS_TYPES.InjectableResolver) private resolvers: InjectableResolver[],
        @inject(POLARIS_TYPES.PolarisServerConfig) private propertiesConfig: PolarisServerConfig,
    ) {}

    generateSchema(): PolarisSchema {
        const schemaDefinition = this.propertiesConfig.polarisProperties.includeSubscription
            ? `schema {query: Query, mutation: Mutation, subscription: Subscription}`
            : `schema {query: Query, mutation: Mutation}`;
        const definitions: ITypeDefinitions = [
            schemaDefinition,
            ...this.types.map(x => x.definition),
        ];
        const resolverObjects = this.resolvers.map(x => x.resolver());

        return { def: definitions, resolvers: Object.assign({}, ...resolverObjects) };
    }
}
