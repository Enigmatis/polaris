import {PolarisTypeWrapper} from "../../../common/polarisTypeWrapper";
let CommonEntityInterfaceDefinition = `interface CommonEntity{
        id: ID!
        creationDate: String,
        lastUpdateDate: String,
        dataVersion: Int!}`;

let CommonEntityInterfaceWrapper: PolarisTypeWrapper = new PolarisTypeWrapper([CommonEntityInterfaceDefinition]);

export {CommonEntityInterfaceWrapper};