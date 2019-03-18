import { PolarisBaseContext, PolarisRequestHeaders } from '@enigmatis/utills';

export interface PolarisContext extends PolarisBaseContext {
    headers: PolarisRequestHeaders;
    body: any;
}
