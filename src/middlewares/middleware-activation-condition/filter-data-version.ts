import { PolarisContext } from '../../server/polaris-context';
import { MiddlewareCondition } from './filter-condition';

class FilterDataVersion implements MiddlewareCondition {
    shouldBeReturned(
        { context, result }: { context: PolarisContext; result: any },
        isSubEntity: boolean,
    ): boolean {
        const dataVersionHeader = context.headers.dataVersion;
        return !dataVersionHeader || isSubEntity || result.dataVersion > dataVersionHeader;
    }
}

export const DataVersionFilter = new FilterDataVersion();
