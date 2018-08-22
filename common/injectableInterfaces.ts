import {IResolvers} from "graphql-yoga/dist/types";
export interface InjectableType {
    definition(): string;
}

export interface InjectableResolver {
    resolver(): IResolvers;
}