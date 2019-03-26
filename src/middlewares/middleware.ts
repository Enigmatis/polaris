import { PolarisBaseContext } from '@enigmatis/utills';
import { GraphQLResolveInfo } from 'graphql';
import { PolarisContext } from '../server/polaris-context';

export interface Middleware<TContext extends PolarisBaseContext = PolarisContext> {
    preResolve(params: RequestMiddlewareParams<TContext>): void;

    postResolve(params: ResponseMiddlewareParams<TContext>): void;
}

export interface RequestMiddlewareParams<TContext extends PolarisBaseContext = PolarisContext> {
    root: any;
    args: { [argName: string]: any };
    context: TContext;
    info: GraphQLResolveInfo;
}

export interface ResponseMiddlewareParams<TContext extends PolarisBaseContext = PolarisContext>
    extends RequestMiddlewareParams<TContext> {
    result: any;
}

export interface MiddlewaresConfiguration {
    allowDataVersionMiddleware: boolean;
    allowRealityMiddleware: boolean;
}
