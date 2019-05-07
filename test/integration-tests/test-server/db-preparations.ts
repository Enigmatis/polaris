import { BookModelPerReality } from './dal/book-model';
export const titles = ['first', 'second', 'third', 'fourth', 'fifth'];
const realityIdHeader = (realityId: number) => ({ headers: { realityId } });
export const prepareDb = async () => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ author: 'arik', title: titles[i], testId: i, dataVersion: i + 1 });
    }
    await BookModelPerReality(realityIdHeader(1)).create(books);
};
