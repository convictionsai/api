import { Bible, Book } from '@prisma/client';

export class ChapterCreate {
    public bible: Bible;
    public book: Book;
    public number: number;
}
