import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';

export interface PolarisContext {
    headers: PolarisRequestHeaders;
    body: any;
    extensions: any;
}
