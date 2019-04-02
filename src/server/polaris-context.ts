import { PolarisBaseContext, PolarisRequestHeaders } from '@enigmatis/utills';
import { PubSub } from 'apollo-server-koa';
import { IrrelevantEntitiesContainer } from '../common/irrelevant-entities-container';

export interface PolarisContext extends PolarisBaseContext {
    headers: PolarisRequestHeaders;
    body: any;
    pubSub?: PubSub;
    irrelevantEntities: IrrelevantEntitiesContainer;
}
