import { Injectable } from '@nestjs/common';
import { Prisma, Chapter } from '@prisma/client';
import { PrismaService } from '../../../Data/PrismaService';

@Injectable()
export class ChaptersService {
    public constructor(private readonly prismaService: PrismaService) { }


    private _chapter(chapterWhereUniqueInput: Prisma.ChapterWhereUniqueInput): Promise<Chapter> {
        return this.prismaService.chapter.findUniqueOrThrow({
            where: chapterWhereUniqueInput,
        });
    }

    private _chapters(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ChapterWhereUniqueInput;
        where?: Prisma.ChapterWhereInput;
        orderBy?: Prisma.ChapterOrderByWithRelationInput;
    }): Promise<Chapter[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.chapter.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }


    public search(): Promise<Array<Chapter>> {
        return this._chapters({ orderBy: { name: 'asc' } })
    }

    public getById(id: string): Promise<Chapter> {
        return this._chapter({ id: id });
    }

    public getByName(name: string): Promise<Chapter> {
        // Only if the Chapter.name is unique, should this be used.
        // return this._chapter({ name: name });

        // Chapter.name is not unique, so this will return the first book with the given name.
        return this.prismaService.chapter.findFirstOrThrow({
            where: {
                name: name,
            },
        });
    }

    public create(data: Prisma.ChapterCreateInput): Promise<Chapter> {
        return this.prismaService.chapter.create({
            data,
        });
    }

}
