import { QueryWithIrrelevant } from '@enigmatis/mongo-driver';
import { UserInputError } from 'apollo-server-koa';
import { PolarisContext } from '../../../../../src/server/polaris-context';
import { AuthorModelPerReality } from '../../dal/author-model';
import { BookModelPerReality } from '../../dal/book-model';
import { Book } from '../definitions/book';
import { BOOK_UPDATED } from './subscription-event-names';

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
    { bookId, update }: { bookId: string; update: Partial<Book> },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return BookModelPerReality(context).update({ id: bookId }, update, { new: true });
    }
};
export const bookResolver = async (
    parent: object | null,
    query: object,
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        return BookModelPerReality(context)
            .find({})
            .lean();
    }
};
export const authorResolver = async (
    parent: object | null,
    query: object,
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        return AuthorModelPerReality(context)
            .find({})
            .lean();
    }
};
export const bookByIdResolver = async (
    parent: object | null,
    { bookId }: { bookId: string },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        return BookModelPerReality(context)
            .findOne({ id: bookId })
            .lean();
    }
};
export const bookStartsWithResolver = async (
    parent: object | null,
    query: any,
    context: PolarisContext,
) => {
    const { realityId, dataVersion } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        const bookModel = BookModelPerReality(context);
        return QueryWithIrrelevant(
            bookModel,
            await bookModel.find({
                title: { $regex: '^' + query.startsWith, $options: 'i' },
            }),
            dataVersion,
        );
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

export const deletedBookByIdResolver = async (
    parent: object | null,
    { bookId }: { bookId: string },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else {
        return BookModelPerReality(context).find({ id: bookId, deleted: true });
    }
};

export const deleteBookResolver = async (
    parent: object | null,
    { bookId, update }: { bookId: string; update: Partial<Book> },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return BookModelPerReality(context).deleteOne({ id: bookId });
    }
};
