import { MiddlewareCondition, ResponseMiddlewareParams } from '../polaris-middleware';

class FilterDataVersion implements MiddlewareCondition {
    shouldPass({ root, context }: ResponseMiddlewareParams): boolean {
        const dataVersionHeader: number | undefined = context.headers.dataVersion;
        return !dataVersionHeader || root.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
