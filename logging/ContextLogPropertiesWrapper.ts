import {LogPropertiesWrapper, PolarisLogProperties} from "@enigmatis/polaris-logs";
import {GraphQLLogProperties} from "./GraphQLLogProperties";

export class ContextLogPropertiesWrapper implements LogPropertiesWrapper{
    private shouldLogReqAndRes: boolean;

    shouldLogRequestAndResponse(shouldLogReqAndRes:boolean){
        this.shouldLogReqAndRes = shouldLogReqAndRes;
    }
    wrapLogProperties(polarisLogProperties:GraphQLLogProperties):PolarisLogProperties{

        polarisLogProperties.setOperationName("info");
        return polarisLogProperties;
    }
    handleContextProperties(){

    }
}