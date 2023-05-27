import { Bible } from '@prisma/client';

export class BookCreate{
    public bible: Bible;
    public number: number;
}
