import { UserInputError } from 'apollo-server-koa';
import { PolarisContext } from '../../../../../src/main';
import { BookModelPerReality } from '../../dal/book-model';
import { Book } from '../entities/book';
import { BOOK_UPDATED } from './subscription-event-names';

export const titleResolver = (book: Book) => {
    if (book.dataVersion !== undefined) {
        return book.title + ' (version ' + book.dataVersion + ')';
    }
    return 'Special Edition: ' + book.title;
};
export const createBookResolver = async (
    parent: object | null,
    { book }: { book: Book },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return BookModelPerReality(context).create(book);
    }
};
export const updateBookResolver = async (
    parent: object | null,
    { bookId, update }: { bookId: number; update: Partial<Book> },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return BookModelPerReality(context).findByIdAndUpdate(bookId, update, { new: true });
    }
};
export const bookQueryResolver = async (
    parent: object | null,
    query: object,
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        return BookModelPerReality(context).find({});
    }
};
export const subscribeResolver = (
    root: any,
    { realityId }: { realityId: number },
    { pubSub }: PolarisContext,
) => {
    BookModelPerReality({ headers: { realityId } })
        .watch({ fullDocument: 'updateLookup' })
        .on('change', async change => {
            await pubSub!.publish(BOOK_UPDATED, { bookChanged: change.fullDocument });
        });
    return pubSub!.asyncIterator([BOOK_UPDATED]);
};
