import { provide } from 'inversify-binding-decorators';
import { InjectableResolver, POLARIS_TYPES } from '../../../../../src/main';

@provide(POLARIS_TYPES.InjectableResolver)
export class BookResolvers implements InjectableResolver {
    resolver(): any {
        return {
            Book: {
                /* title(book: any, _: any, context: any) {
                    const headers = context.headers;
                    if (headers.dataVersion !== undefined) {
                        return book.title + ' (version ' + headers.dataVersion + ')';
                    }
                    return 'Special Edition: ' + book.title;
                },*/
            },
        };
    }
}
