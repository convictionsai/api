import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BooksService } from './BooksService';
import { BookRequest } from '../../Dto/Bibles/Books/BookRequest';

@ApiTags('Books')
@Controller('/books')
export class BooksController {
    public constructor(private readonly booksService: BooksService) { }

    @ApiOperation({
        summary: 'Search for books',
        description: 'Search for books',
    })
    /**  Search for books
     *
     * @returns The books
     */
    @Get('/')
    public search(): Promise<Array<Book>> {
        return this.booksService.search();
    }

    @ApiOperation({
        summary: 'Get a book by its id',
        description: 'Get a book by its id',
    })
    /** Get a book by its id
     *
     * @param id - The id of the book
     * @returns The book
     * */
    @Get('/:id')
    public get(@Param() bookRequest: BookRequest): Promise<Book> {
        return this.booksService.getById(bookRequest.id);
    }

    // @ApiOperation({
    //     summary: 'Create a book',
    //     description: 'Create a book',
    // })
    // /** Create a book
    //  *
    //  * @param create - The book to create
    //  * @returns The created book
    //  */
    // @Post('/')
    // public create(@Body() create: Prisma.BookCreateInput): Promise<Book> {
    //     return this.booksService.create(create);
    // }
}
