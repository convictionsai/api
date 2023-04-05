import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SearchOptions } from '../Models/Search/SearchOptions';
import { SearchService } from './SearchService';

@ApiTags('Search')
@Controller('/search')
export class SearchController {
    public constructor(private readonly searchService: SearchService) {}

    @Get('/options')
    public search(): Promise<SearchOptions> {
        return this.searchService.getOptions();
    }
    // @Post('/qa')
    // public qa(@Body() request: QARequest): Observable<QAResult> {
    //     return this.searchService.qa(request).pipe(first());
    // }
}
