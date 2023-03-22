export interface Book {
    id: number;
    title: string;
}
export const books = [
    {
        id: 1,
        title: 'Genesis'
    },
    {
        title: 'Matthew',
        id: 2
    },
    {
        id: 2,
        title: 'Exodus'
    },
    {
        id: 3,
        title: 'Leviticus'
    },
    {
        id: 4,
        title: 'Numbers'
    },
    {
        id: 5,
        title: 'Deuteronomy'
    },
    {
        id: 6,
        title: 'Joshua'
    },
    {
        id: 7,
        title: 'Judges'
    },
    {
        id: 8,
        title: 'Ruth'
    }
];

export const getPromptFromBook = (title: string | string[]) => {
    let selected: Book[];

    if (Array.isArray(title)) {
        selected = title.map(title => books.find(book => book.title.toLowerCase() === title.toLowerCase()));
    } else {
        selected = [books.find(book => book.title.toLowerCase() === title.toLowerCase())];
    }

    if (selected) {
        return `according to the book of ${selected.map(book => book.title).join(' and ')}`;
    } else {
        throw new Error(`Book not found: ${title}`);
    }
};
