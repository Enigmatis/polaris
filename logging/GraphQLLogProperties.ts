import {PolarisLogProperties} from "@enigmatis/polaris-logs";

export interface GraphQLLogProperties extends PolarisLogProperties {
    operationName?: string;
}
