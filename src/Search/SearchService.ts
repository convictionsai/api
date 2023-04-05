import { Injectable } from '@nestjs/common';
import { firstValueFrom, Observable, of } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { BooksService } from '../Bibles/Books/BooksService';
import { QAResult } from '../Models/Search/QA/QAResult';
import { SearchOptions } from '../Models/Search/SearchOptions';

@Injectable()
export class SearchService {
    public constructor(private readonly booksService: BooksService) {
    }

    public async getOptions(): Promise<SearchOptions> {
        return {
            books: await firstValueFrom(this.booksService.search())
        }
    }
}
