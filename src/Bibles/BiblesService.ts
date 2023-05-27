import { Injectable } from '@nestjs/common';
import { Prisma, Bible } from '@prisma/client';
import { PrismaService } from '../Data/PrismaService';
// import { from, Observable } from 'rxjs';

@Injectable()
export class BiblesService {
    public constructor(private readonly prismaService: PrismaService) {
    }

    private _bible(bibleWHereUniqueInput: Prisma.BibleWhereUniqueInput): Promise<Bible> {
        return this.prismaService.bible.findUniqueOrThrow({
            where: bibleWHereUniqueInput,
        })
    }

    private _bibles(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.BibleWhereUniqueInput;
        where?: Prisma.BibleWhereInput;
        orderBy?: Prisma.BibleOrderByWithRelationInput;
    }): Promise<Bible[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.bible.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    public search(): Promise<Array<Bible>> {
        return this._bibles({});
    }

    public getById(id: string): Promise<Bible> {
        return this._bible({ id: id });
    }

    public create(data: Prisma.BibleCreateInput): Promise<Bible> {
        return this.prismaService.bible.create({
            data,
        })
    }

}
