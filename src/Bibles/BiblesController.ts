import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Prisma, Bible } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
// import { Observable } from 'rxjs';
import { BiblesService } from './BiblesService';

@ApiTags('Bibles')
@Controller('/bibles')
export class BiblesController {
    public constructor(private readonly biblesService: BiblesService) {}

    @Get('/')
    public search(): Promise<Array<Bible>> {
        return this.biblesService.search();
    }

    @Get('/:bibleId([a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12})')
    public get(@Param('bibleId', new ParseUUIDPipe({ version: '4' })) bibleId: string): Promise<Bible> {
        return this.biblesService.getById(bibleId);
    }

    @Post('/')
    public create(@Body() create: Prisma.BibleCreateInput): Promise<Bible> {
        return this.biblesService.create(create);
    }
}
