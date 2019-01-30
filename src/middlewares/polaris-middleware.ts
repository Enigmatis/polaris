import { GraphQLResolveInfo } from 'graphql';

export interface PolarisMiddleware<TContext = any> {
    preResolve(params: MiddlewareParams<TContext>): void;

    postResolve(params: PostMiddlewareParams<TContext>): string;
}

export interface MiddlewareParams<TContext = any> {
    root: any;
    args: { [argName: string]: any };
    context: TContext;
    info: GraphQLResolveInfo;
}

export interface PostMiddlewareParams<TContext = any> extends MiddlewareParams<TContext> {
    result: string;
}
