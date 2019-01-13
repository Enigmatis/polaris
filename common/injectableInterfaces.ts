import {IResolvers} from 'graphql-tools';
import {LogProperties} from "../properties/LogProperties";
import {ApplicationLogProperties} from "@enigmatis/polaris-logs/dist/index";
import {PolarisProperties} from "../properties/polarisProperties";

export interface InjectableType {
    definition(): string;
}

export interface InjectableResolver {
    resolver(): IResolvers;
}

export interface IConfig {
    getLogProperties(): LogProperties;
    getPolarisProperties(): PolarisProperties;
}