import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai';
import { DataSource, Repository } from 'typeorm';
import { BooksService } from '../../Bibles/Books/BooksService';
import { getPromptFromBook } from '../../Data/BookData';
import { QAHitType } from '../../Models/Search/QA/QAHitType';
import { QARequest } from '../../Models/Search/QA/QARequest';
import { QAResult } from '../../Models/Search/QA/QAResult';
import { QAResultStatus } from '../../Models/Search/QA/QAResultStatus';

@Injectable()
export class QAService {
    private readonly repository: Repository<QAResult>;
    private readonly openai = new OpenAIApi(
        new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })
    );

    public constructor(private readonly dataSource: DataSource,
                       private readonly booksService: BooksService) {
        this.repository = dataSource.getRepository(QAResult);
    }

    public search() {}

    public getById(id: string): Promise<QAResult> {
        return this.repository.findOneOrFail({
            where: {
                id
            }
        });
    }

    public getByPrompt(prompt: string): Promise<QAResult> {
        return this.repository.findOneOrFail({
            where: {
                prompt
            }
        });
    }

    public async qa(request: QARequest, nocache: boolean): Promise<QAResult> {
        console.log(request);
        const start = Date.now();

        let result: QAResult;
        let response: CreateCompletionResponse;

        const prompt = `${request.prompt} (${getPromptFromBook(['matthew', 'genesis', 'Deuteronomy'])})`;

        console.log(nocache);
        try {
            if (!nocache) {
                console.log(prompt);
                result = await this.getByPrompt(prompt);
                console.log('cache hit', result);
                return { ...result, hit: QAHitType.CACHE };
            }
        } catch (error) {
            console.log(error);
        }

        if (!result) {
            response = (
                await this.openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: prompt,
                    temperature: 0,
                    max_tokens: 100,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0
                })
            ).data;
            console.log(response);
        }

        if (response) {
            try {
                result = await this.repository.save({
                    prompt: request.prompt,
                    answer: response.choices[0].text.trim(),
                    tokens: response.usage.total_tokens,
                    status: QAResultStatus.ACTIVE,
                    time: Date.now() - start,
                    books: request.books.map(book =>  {
                        return { id: book }
                    })
                });
                return { ...result, hit: QAHitType.LIVE };
            } catch (error) {
                result = await this.getByPrompt(request.prompt);
                await this.repository.update(result.id, {
                    time: Date.now() - start,
                    answer: response.choices[0].text.trim()
                });
                return {
                    ...(await this.getByPrompt(request.prompt)),
                    hit: QAHitType.LIVE
                };
            }
        }
    }
}
