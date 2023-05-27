import { AMQPLogLevel, AMQPModule } from '@nestjs.pro/amqp';
import { Module } from '@nestjs/common';
import { BiblesController } from './Bibles/BiblesController';
import { BiblesService } from './Bibles/BiblesService';
import { BooksService } from './Bibles/Books/BooksService';
import { PrismaService } from './Data/PrismaService';
import { ChaptersService } from './Bibles/Books/Chapters/ChaptersService';
import { QAController } from './Search/QA/QAController';
import { QAService } from './Search/QA/QAService';
import { SearchController } from './Search/SearchController';
import { SearchService } from './Search/SearchService';

@Module({
    imports: [
        AMQPModule.forRoot({
            logLevel: AMQPLogLevel.ERROR,
            autoConnect: true,
            connections: [
                {
                    name: 'default',
                    url: process.env.RABBITMQ_URI,
                    exchange: {
                        name: 'bibles',
                        type: 'topic',
                        options: {
                            durable: true
                        }
                    },

                    queues: []
                }
            ]
        })
    ],
    providers: [
        BiblesService,
        BooksService,
        ChaptersService,
        SearchService,
        PrismaService,
        QAService
    ],
    controllers: [
        BiblesController,
        SearchController,
        QAController
    ]
})
export class APIModule { }
