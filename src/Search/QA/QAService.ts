import { Injectable } from '@nestjs/common';
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai';
import { BooksService } from '../../Bibles/Books/BooksService';
import { getPromptFromBook } from '../../Data/BookData';
import { QARequest } from '../../Dto/Search/QA/QARequest';

import { Prisma, QAResult, QAResultStatus, QAHitType } from '@prisma/client';
import { PrismaService } from '../../Data/PrismaService';

@Injectable()
export class QAService {
    private readonly openai = new OpenAIApi(
        new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        })
    );

    public constructor(private readonly prismaService: PrismaService,
        private readonly booksService: BooksService) { }

    public search() { }

    private _qaResult(qaResultWhereUniqueInput: Prisma.QAResultWhereUniqueInput): Promise<QAResult> {
        return this.prismaService.qAResult.findUniqueOrThrow({
            where: qaResultWhereUniqueInput,
        });
    }

    public getById(id: string): Promise<QAResult> {
        return this._qaResult({ id: id });
    }


    public getByPrompt(prompt: string): Promise<QAResult> {

        return this.prismaService.qAResult.findFirstOrThrow({
            where: {
                prompt: prompt,
            }
        })

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
            const books = ['4072ab14-d440-485b-b58b-ac295d0ca3ca', 'bd71faa2-b209-473f-a86f-4b1ab8c15a12', 'dc20fe41-9989-44a7-a764-a683fc289fd9'];
            const qaResultToBook = books.map((book: string) => {
                return { 'bookId': book };
            });
            try {
                result = await this.prismaService.qAResult.create({
                    data: {
                        prompt: prompt,
                        answer: response.choices[0].text.trim(),
                        tokens: response.usage.total_tokens,
                        status: QAResultStatus.ACTIVE,
                        time: Date.now() - start,
                        QAResultToBook: {
                            // create: [
                            //     { bookId: '1' },
                            //     { bookId: '2' },
                            //     { bookId: '3' }
                            // ]
                            create: qaResultToBook
                        },
                        hash: 'hash',
                        hit: QAHitType.LIVE

                    }
                });
                return { ...result, hit: QAHitType.LIVE };
            } catch (error) {
                console.log('Writing to db failed');
                console.log(error);
                result = await this.getByPrompt(request.prompt);
                await this.prismaService.qAResult.update({
                    where: {
                        id: result.id
                    },
                    data: {
                        time: Date.now() - start,
                        answer: response.choices[0].text.trim()
                    }
                });
                return {
                    ...(await this.getByPrompt(request.prompt)),
                    hit: QAHitType.LIVE
                };
            }
        }
    }
}
