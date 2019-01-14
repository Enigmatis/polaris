import {IResolvers} from 'graphql-tools';
import {PolarisProperties} from "../properties/polarisProperties";
import {LoggerConfiguration, ApplicationLogProperties} from "@enigmatis/polaris-logs";

export interface InjectableType {
    definition(): string;
}

export interface InjectableResolver {
    resolver(): IResolvers;
}

export interface ILogConfig {
    getLogConfiguration(): LoggerConfiguration;
}
export interface IPolarisServerConfig {
    getPolarisProperties(): PolarisProperties;
    getApplicationLogProperties(): ApplicationLogProperties;
}