import { Injectable } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { PrismaService } from '../../Data/PrismaService';

@Injectable()
export class BooksService {
    public constructor(private readonly prismaService: PrismaService) { }

    private _book(bookWhereUniqueInput: Prisma.BookWhereUniqueInput): Promise<Book> {
        return this.prismaService.book.findUniqueOrThrow({
            where: bookWhereUniqueInput,
        });
    }

    private _books(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BookWhereUniqueInput;
        where?: Prisma.BookWhereInput;
        orderBy?: Prisma.BookOrderByWithRelationInput;
    }): Promise<Array<Book>> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.book.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }


    public search(): Promise<Array<Book>> {
        return this._books({ orderBy: { name: 'asc' } })
    }

    public getById(id: string): Promise<Book> {
        return this._book({ id: id });
    }

    public getByName(name: string): Promise<Book> {
        // Only if the Book.name is unique, should this be used.
        // return this._book({ name: name });

        // Book.name is not unique, so this will return the first book with the given name.
        return this.prismaService.book.findFirstOrThrow({
            where: {
                name: name,
            },
        });
    }


    public create(data: Prisma.BookCreateInput): Promise<Book> {

        return this.prismaService.book.create({
            data,
        });
    }

}
