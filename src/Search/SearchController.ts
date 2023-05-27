import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QAResult } from '@prisma/client';
import { Observable } from 'rxjs';
import { QARequest } from '../Dto/Search/QA/QARequest';
import { SearchOptions } from '../Dto/Search/SearchOptions';
import { SearchService } from './SearchService';

@ApiTags('Search')
@Controller('/search')
export class SearchController {
    public constructor(private readonly searchService: SearchService) {}

    // @Get('/options')
    // public search(): Promise<SearchOptions> {
    //     return this.searchService.getOptions();
    // }

    // @Post('/qa')
    // public qa(@Body() request: QARequest): Promise<QAResult> {
    //     return this.searchService.qa(request, false);
    // }
}
