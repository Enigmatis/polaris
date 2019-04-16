import { BookModelPerReality } from './dal/book-model';

const realityIdHeader = (realityId: number) => ({ headers: { realityId } });

export const zeroRealityTitles: string[] = ['interesting'];
export const firstRealityTitles: string[] = ['first', 'second', 'third', 'fourth', 'fifth'];
export const secondRealityTitles: string[] = ['1st', '2nd'];
export const thirdRealityTitles: string[] = ['3rd', '4th', '5th'];

export const prepareDb = async () => {
    await BookModelPerReality(realityIdHeader(0)).create(
        await generateBookArrayWithIds(zeroRealityTitles),
    );
    await BookModelPerReality(realityIdHeader(1)).create(
        await generateBookArrayWithIds(firstRealityTitles),
    );
    await BookModelPerReality(realityIdHeader(2)).create(
        generateBookArrayWithIds(secondRealityTitles),
    );
    await BookModelPerReality(realityIdHeader(3)).create(
        generateBookArrayWithIds(thirdRealityTitles),
    );
};

const generateBookArrayWithIds = (titleArray: string[]) => {
    const books = [];
    for (let i = 0; i < titleArray.length; i++) {
        books.push({ id: i, title: titleArray[i] });
    }
    return books;
};
