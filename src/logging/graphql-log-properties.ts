import { PolarisLogProperties } from '@enigmatis/polaris-logs';

export interface GraphqlLogProperties extends PolarisLogProperties {
    operationName?: string;
}
