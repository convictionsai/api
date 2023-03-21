import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { Bible } from '../Models/Bibles/Bible';
import { BibleCreate } from '../Models/Bibles/BibleCreate';

@Injectable()
export class BiblesService {
    private readonly repository: Repository<Bible>;

    public constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Bible);
    }

    public search(): Observable<Array<Bible>> {
        return from(
            this.repository.find({
                order: {
                    name: 'ASC'
                }
            })
        );
    }

    public getById(id: string): Observable<Bible> {
        return from(
            this.repository.findOneOrFail({
                where: {
                    id
                }
            })
        );
    }

    public create(create: BibleCreate): Observable<Bible> {
        return from(this.repository.save(create));
    }
}
