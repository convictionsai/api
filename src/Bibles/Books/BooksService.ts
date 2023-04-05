import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { Bible } from '../../Models/Bibles/Bible';
import { BibleCreate } from '../../Models/Bibles/BibleCreate';
import { Book } from '../../Models/Bibles/Books/Book';
import { BookCreate } from '../../Models/Bibles/Books/BookCreate';

@Injectable()
export class BooksService {
    private readonly repository: Repository<Book>;

    public constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Book);
    }

    public search(): Observable<Array<Book>> {
        return from(
            this.repository.find({
                order: {
                    name: 'ASC'
                }
            })
        );
    }

    public getById(id: string): Observable<Book> {
        return from(
            this.repository.findOneOrFail({
                where: {
                    id
                }
            })
        );
    }

    public getByName(name: string): Observable<Book> {
        return from(
            this.repository.findOneOrFail({
                where: {
                    name
                }
            })
        );
    }

    public create(create: BookCreate) {
        return this.repository.save({
            bible: create.bible,
            number: create.number,
        });
    }

}
