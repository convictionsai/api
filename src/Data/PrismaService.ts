import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
            ],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async subscribeToEventBasedLogging() {

        // @ts-ignore
        this.$on('query', async (e: Prisma.QueryEvent) => {
            console.log('Query: ' + e.query);
            console.log('Params: ' + JSON.stringify(e.params));
            console.log('Duration: ' + e.duration + 'ms');
        });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}

// Logging Reference: https://www.prisma.io/docs/concepts/components/prisma-client/logging
