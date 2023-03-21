import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './SearchService';

@ApiTags('Search')
@Controller('/search')
export class SearchController {
    public constructor(private readonly searchService: SearchService) {}

    // @Get('/')
    // public search(): Observable<Array<Bible>> {
    //     return this.searchService.search();
    // }
    // @Post('/qa')
    // public qa(@Body() request: QARequest): Observable<QAResult> {
    //     return this.searchService.qa(request).pipe(first());
    // }
}
