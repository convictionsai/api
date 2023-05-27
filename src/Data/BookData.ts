import { Book } from '@prisma/client';

export const getPromptFromBook = (title: string | string[], allBooks: Book[]) => {
    let selected: Book[];

    if (Array.isArray(title)) {
        selected = title.map(title => allBooks.find(book => book.name.toLowerCase() === title.toLowerCase()));
    } else {
        selected = [allBooks.find(book => book.name.toLowerCase() === title.toLowerCase())];
    }

    if (selected) {
        return `according to the book of ${selected.map(book => book.name).join(' and ')}`;
    } else {
        throw new Error(`Book not found: ${title}`);
    }
};
