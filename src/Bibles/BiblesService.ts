import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { from, Observable } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { PrismaService } from '../Data/PrismaService';
import { Bible } from '../Models/Bibles/Bible';
import { BibleCreate } from '../Models/Bibles/BibleCreate';

@Injectable()
export class BiblesService {
    public constructor(private readonly prismaSerivce: PrismaService) {
    }

    public search(): Promise<Array<Bible>> {
        return this.prismaSerivce.bible.findMany()
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
