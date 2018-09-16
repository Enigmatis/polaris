import {IResolvers} from 'graphql-tools';

export interface InjectableType {
    definition(): string;
}

export interface InjectableResolver {
    resolver(): IResolvers;
}