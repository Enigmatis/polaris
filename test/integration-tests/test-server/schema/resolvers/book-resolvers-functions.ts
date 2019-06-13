import { PolarisRequestHeaders } from '@enigmatis/utills';
import { UserInputError } from 'apollo-server-koa';
import { PolarisContext } from '../../../../../src/server/polaris-context';
import { Author } from '../definitions/author';
import { Book } from '../definitions/book';
import { BOOK_UPDATED } from './subscription-event-names';

import { getModelCreator, QueryWithIrrelevant } from '@enigmatis/mongo-driver';
import { authorSchema } from '../../dal/author-model';
import { bookSchema } from '../../dal/book-model';

export const createBookResolver = async (
    parent: object | null,
    { book }: { book: Book },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return getModelCreator<Book>('book', bookSchema)(context).create(book);
    }
};
export const createAuthorResolver = async (
    parent: object | null,
    { author }: { author: Author },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return getModelCreator<Author>('author', authorSchema)(context).create(author);
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
        return getModelCreator<Book>('book', bookSchema)(context).updateOne(
            { testId: bookId },
            update,
            {
                new: true,
            },
        );
    }
};
export const updateAuthorResolver = async (
    parent: object | null,
    { authorId, update }: { authorId: string; update: Partial<Author> },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return getModelCreator<Author>('author', authorSchema)(context).updateOne(
            { testId: authorId },
            update,
            {
                new: true,
            },
        );
    }
};

export const bookResolver = async (
    parent: object | null,
    query: object,
    context: PolarisContext,
) => {
    const { realityId, includeLinkedOperation } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header');
    } else if (includeLinkedOperation) {
        const zeroRealityHeaders = { ...context.headers };
        zeroRealityHeaders.realityId = 0;
        const zeroRealityContext = { ...context };
        zeroRealityContext.headers = zeroRealityHeaders;
        return getModelCreator<Book>('book', bookSchema)(context)
            .find({})
            .populate({
                path: 'author',
                model: getModelCreator<Author>('author', authorSchema)(zeroRealityContext),
            })
            .lean();
    } else {
        return getModelCreator<Book>('book', bookSchema)(context)
            .find({})
            .populate({
                path: 'author',
                model: getModelCreator<Author>('author', authorSchema)(context),
            })
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
        return getModelCreator<Book>('book', bookSchema)(context)
            .findOne({ testId: bookId })
            .populate({
                path: 'author',
                model: getModelCreator<Author>('author', authorSchema)(context),
            })
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
        const bookModel = getModelCreator<Book>('book', bookSchema)(context);
        return QueryWithIrrelevant(
            bookModel,
            await bookModel.find({
                title: { $regex: '^' + query.startsWith, $options: 'i' },
            }),
            dataVersion,
        );
    }
};
export const subscribeResolver = async (
    root: any,
    { realityId }: { realityId: number },
    { pubSub }: PolarisContext,
) => {
    getModelCreator<Book>('book', bookSchema)({ headers: { realityId } })
        .watch({ fullDocument: 'updateLookup' })
        .on('change', async change => {
            await pubSub!.publish(BOOK_UPDATED, { bookChanged: change.fullDocument });
        });
    return pubSub!.asyncIterator([BOOK_UPDATED]);
};

export const deleteBookResolver = async (
    parent: object | null,
    { bookId }: { bookId: string },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return getModelCreator<Book>('book', bookSchema)(context).deleteOne({ testId: bookId });
    }
};

export const deleteAuthorResolver = async (
    parent: object | null,
    { authorId }: { authorId: string },
    context: PolarisContext,
) => {
    const { realityId } = context.headers;
    if (!Number.isInteger(realityId as any)) {
        throw new UserInputError('please provide reality-id header as number');
    } else {
        return getModelCreator<Author>('author', authorSchema)(context).deleteOne({
            testId: authorId,
        });
    }
};
