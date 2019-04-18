import { AuthorModelPerReality } from './dal/author-model';
import { BookModelPerReality } from './dal/book-model';

const realityIdHeader = (realityId: number) => ({ headers: { realityId } });

export const firstRealityTitles: string[] = ['first', 'second', 'third', 'fourth', 'fifth'];
const secondRealityTitles: string[] = ['1st', '2nd'];

export const prepareDb = async () => {
    const author = { id: 0, firstName: 'Foo', lastName: 'Bar' };
    await AuthorModelPerReality(realityIdHeader(0)).create(author);

    await BookModelPerReality(realityIdHeader(1)).create(
        await generateBookArrayWithIds(firstRealityTitles),
    );

    await BookModelPerReality(realityIdHeader(2)).create(
        generateBookArrayWithIds(secondRealityTitles),
    );

    await BookModelPerReality(realityIdHeader(3)).create({
        id: 0,
        title: 'Shadow Realm',
        author,
    });
};

const generateBookArrayWithIds = (titleArray: string[]) => {
    const books = [];
    for (let i = 0; i < titleArray.length; i++) {
        books.push({ id: i, title: titleArray[i] });
    }
    return books;
};
