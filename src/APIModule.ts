import { AMQPLogLevel, AMQPModule } from '@nestjs.pro/amqp';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiblesController } from './Bibles/BiblesController';
import { BiblesService } from './Bibles/BiblesService';
import { TYPEORM_CONFIG } from './Models/TypeOrmConfig';
import { QAController } from './Search/QA/QAController';
import { QAService } from './Search/QA/QAService';
import { SearchController } from './Search/SearchController';
import { SearchService } from './Search/SearchService';

@Module({
    imports: [
        TypeOrmModule.forRoot(TYPEORM_CONFIG),
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
    providers: [BiblesService, SearchService, QAService],
    controllers: [BiblesController, SearchController, QAController]
})
export class APIModule {}
