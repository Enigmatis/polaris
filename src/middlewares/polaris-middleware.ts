import { GraphQLResolveInfo } from 'graphql';
import { PolarisContext } from '../server/polaris-context';

export interface PolarisMiddleware<TContext extends PolarisContext = PolarisContext> {
    preResolve(params: MiddlewareParams<TContext>): void;

    postResolve(params: PostMiddlewareParams<TContext>): void;
}

export interface MiddlewareParams<TContext extends PolarisContext = PolarisContext> {
    root: any;
    args: { [argName: string]: any };
    context: TContext;
    info: GraphQLResolveInfo;
}

export interface PostMiddlewareParams<TContext extends PolarisContext = PolarisContext>
    extends MiddlewareParams<TContext> {
    result: string;
}
