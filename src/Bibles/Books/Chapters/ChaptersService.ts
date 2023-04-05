import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { Chapter } from '../../../Models/Bibles/Books/Chapters/Chapter';
import { ChapterCreate } from '../../../Models/Bibles/Books/Chapters/ChapterCreate';

@Injectable()
export class ChaptersService {
    private readonly repository: Repository<Chapter>;

    public constructor(private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Chapter);
    }

    public search(): Observable<Array<Chapter>> {
        return from(
            this.repository.find({
                order: {
                    name: 'ASC'
                }
            })
        );
    }

    public getById(id: string): Observable<Chapter> {
        return from(
            this.repository.findOneOrFail({
                where: {
                    id
                }
            })
        );
    }

    public getByName(name: string): Observable<Chapter> {
        return from(
            this.repository.findOneOrFail({
                where: {
                    name
                }
            })
        );
    }

    public create(create: ChapterCreate) {
        return this.repository.save({
            number: create.number,
        });
    }

}
