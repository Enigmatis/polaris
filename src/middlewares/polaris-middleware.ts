import { GraphQLResolveInfo } from 'graphql';
import { PolarisContext } from '../server/polaris-context';

export interface MiddlewareCondition {
    shouldPass(params: ResponseMiddlewareParams): boolean;
}

export interface PolarisMiddleware<TContext extends PolarisContext = PolarisContext> {
    preResolve(params: RequestMiddlewareParams<TContext>): void;

    postResolve(params: ResponseMiddlewareParams<TContext>): void;
}

export interface RequestMiddlewareParams<TContext extends PolarisContext = PolarisContext> {
    root: any;
    args: { [argName: string]: any };
    context: TContext;
    info: GraphQLResolveInfo;
}

export interface ResponseMiddlewareParams<TContext extends PolarisContext = PolarisContext>
    extends RequestMiddlewareParams<TContext> {
    result: string | null;
}
