import {Container} from "inversify";
import {
    GraphQLLogger,
    InjectableLogger,
    IPolarisGraphQLServer,
    ISchemaCreator,
    PolarisGraphQLServer,
    SchemaCreator
} from "..";
import { decorate, injectable } from "inversify";
import {
    PolarisLogger
} from "@enigmatis/polaris-logs";

decorate(injectable(), PolarisLogger)
let container = new Container({skipBaseClassChecks: true});
container.bind<IPolarisGraphQLServer>("IPolarisGraphQLServer").to(PolarisGraphQLServer)
container.bind<ISchemaCreator>("ISchemaCreator").to(SchemaCreator)
container.bind<InjectableLogger>("InjectableLogger").to(GraphQLLogger)

export {container}