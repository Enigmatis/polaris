import {PolarisLogProperties} from "@enigmatis/polaris-logs";

export class GraphQLLogProperties extends PolarisLogProperties {
    private operationName: string;

    setOperationName(operationName: string) {
        this.operationName = operationName;
    }
}