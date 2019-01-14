import {PolarisLogProperties} from "@enigmatis/polaris-logs";
import {EventKindDescriptionLogProperty} from "@enigmatis/polaris-logs/dist/src/entities/event-kind-description-log-property";
import {RealityLogProperty} from "@enigmatis/polaris-logs/dist/src/entities/reality-log-property";
import {RequestLogProperty} from "@enigmatis/polaris-logs/dist/src/entities/request-log-property";
import {SystemLogProperty} from "@enigmatis/polaris-logs/dist/src/entities/system-log-property";

export interface GraphQLLogProperties extends PolarisLogProperties {
    operationName?: string;
}
