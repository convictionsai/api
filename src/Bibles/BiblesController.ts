import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Bible } from '../Models/Bibles/Bible';
import { BibleCreate } from '../Models/Bibles/BibleCreate';
import { BiblesService } from './BiblesService';

@ApiTags('Bibles')
@Controller('/bibles')
export class BiblesController {
    public constructor(private readonly biblesService: BiblesService) {}

    @Get('/')
    public search(): Observable<Array<Bible>> {
        return this.biblesService.search();
    }

    @Get('/:bibleId([a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12})')
    public get(@Param('bibleId', new ParseUUIDPipe({ version: '4' })) bibleId: string): Observable<Bible> {
        return this.biblesService.getById(bibleId);
    }

    @Post('/')
    public create(@Body() create: BibleCreate): Observable<Bible> {
        return this.biblesService.create(create);
    }
}
