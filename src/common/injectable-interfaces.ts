import { ApplicationLogProperties, LoggerConfiguration } from '@enigmatis/polaris-logs';
import { IResolvers } from 'graphql-tools';
import { HeadersConfiguration } from '../http/request/polaris-request-headers';
import { PolarisProperties } from '../properties/polaris-properties';

export interface InjectableType {
    definition: string;
}

export interface InjectableResolver {
    resolver(): IResolvers;
}

export interface LogConfig {
    getLogConfiguration(): LoggerConfiguration;
}
export interface HeaderConfig {
    getHeadersConfiguration(): HeadersConfiguration;
}
export interface PolarisServerConfig {
    getPolarisProperties(): PolarisProperties;
    getApplicationLogProperties(): ApplicationLogProperties;
}
