import { GraphQLResolveInfo } from 'graphql';
import { PolarisRequestHeaders } from '../http/request/polaris-request-headers';

export interface PolarisMiddleware {
    preResolve(params: RequestMiddlewareParams): void;

    postResolve(params: ResponseMiddlewareParams): string | null;
}

export interface MiddlewareCondition {
    shouldPass(params: ResponseMiddlewareParams): boolean;
}

export interface PolarisContext {
    headers: PolarisRequestHeaders;
    body: any;
}

export interface RequestMiddlewareParams {
    root: any;
    args: { [argName: string]: any };
    context: PolarisContext;
    info: GraphQLResolveInfo;
}

export interface ResponseMiddlewareParams extends RequestMiddlewareParams {
    result: string | null;
}
