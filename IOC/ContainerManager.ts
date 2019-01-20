import {Container} from "inversify";
import {
    GraphQLLogger,
    InjectableLogger,
    IPolarisGraphQLServer,
    ISchemaCreator,
    PolarisGraphQLServer,
    SchemaCreator
} from "..";
import {decorate, injectable} from "inversify";
import {PolarisLogger} from "@enigmatis/polaris-logs";
import {PolarisMiddleware} from "../middlewares/polaris-middleware";
import {LoggerMiddleware} from "../middlewares/logger-middleware";

decorate(injectable(), PolarisLogger);
let polarisContainer = new Container({skipBaseClassChecks: true});
polarisContainer.bind<IPolarisGraphQLServer>("IPolarisGraphQLServer").to(PolarisGraphQLServer);
polarisContainer.bind<ISchemaCreator>("ISchemaCreator").to(SchemaCreator);
polarisContainer.bind<InjectableLogger>("InjectableLogger").to(GraphQLLogger);
polarisContainer.bind<PolarisMiddleware>("PolarisMiddleware").to(LoggerMiddleware);
export {polarisContainer}