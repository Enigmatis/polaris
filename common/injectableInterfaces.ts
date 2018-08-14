export interface InjectableType {
    definition(): string;
}

export interface InjectableResolver {
    resolver(): any;
}