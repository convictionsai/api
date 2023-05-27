import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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

    async enableEventBasedLogging() {
        // @ts-ignore
        this.$on('query', async (e) => {
            // @ts-ignore
            console.log('Query: ' + e.query);
            // @ts-ignore
            console.log('Params: ' + JSON.stringify(e.params));
            // @ts-ignore
            console.log('Duration: ' + e.duration + 'ms');
        });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
