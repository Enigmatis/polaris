import { BookModelPerReality } from './dal/book-model';
export const titles = ['first', 'second', 'third', 'fourth', 'fifth'];
const realityIdHeader = (realityId: number) => ({ headers: { realityId } });
export const prepareDb = async () => {
    const books = [];
    for (let i = 0; i < titles.length; i++) {
        books.push({ author: 'chen', title: titles[i], id: i });
    }
    await BookModelPerReality(realityIdHeader(1)).create(books);
};
