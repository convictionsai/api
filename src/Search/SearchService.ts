import { Injectable } from '@nestjs/common';
import { firstValueFrom, Observable, of } from 'rxjs';
import { BooksService } from '../Bibles/Books/BooksService';
import { Prisma, Book } from '@prisma/client';

@Injectable()
export class SearchService {
    public constructor(private readonly booksService: BooksService) {
    }

    public async getOptions(): Promise<Array<Book>> {
        return await this.booksService.search()
    }
}
