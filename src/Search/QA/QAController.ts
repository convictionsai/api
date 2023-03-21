import { Body, Controller, ParseBoolPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QARequest } from '../../Models/Search/QA/QARequest';
import { QAResult } from '../../Models/Search/QA/QAResult';
import { QAService } from './QAService';

@ApiTags('Question & Answering')
@Controller('/search/qa')
export class QAController {
    public constructor(private readonly qaService: QAService) {}

    @Post('/')
    @ApiQuery({
        name: 'nocache',
        type: 'boolean',
        description: 'If true, the answer will not be cached',
        required: false
    })
    @ApiBody({
        type: QARequest,
        description: 'The question and answer request',
        examples: {
            'Ask a simple question': {
                value: {
                    prompt: 'How can I use the bible to motivate my friends?'
                }
            }
        }
    })
    public qa(@Body() request: QARequest, @Query('nocache', ParseBoolPipe) nocache: boolean): Promise<QAResult> {
        return this.qaService.qa(request, nocache);
    }
}
