import { PolarisBaseContext, PolarisRequestHeaders } from '@enigmatis/utills';
import { PubSub } from 'apollo-server-koa';

export interface PolarisContext extends PolarisBaseContext {
    headers: PolarisRequestHeaders;
    body: any;
    pubSub?: PubSub;
    extensions: any;
}
