import { MiddlewareCondition, ResponseMiddlewareParams } from '../polaris-middleware';

class FilterDataVersion implements MiddlewareCondition {
    shouldPass({ root, context }: ResponseMiddlewareParams): boolean {
        return root.dataVersion > context.headers.dataVersion;
    }
}

export const DataVersionFilter = new FilterDataVersion();
