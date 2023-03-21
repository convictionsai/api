require('dotenv').config({ path: `.env.${process.env.ENVIRONMENT}` });

import { Server } from '@nestjs.pro/common/dist/server/Server';
import { ServerConfig } from '@nestjs.pro/common/dist/server/ServerConfig';
import { ServerEnvironment } from '@nvr-ai/common/Server/ServerEnvironment';
import { ServerUtilities } from '@nvr-ai/common/Server/ServerUtilities';
import { APIModule } from './APIModule';

Server.bootstrap(
    new ServerConfig({
        name: 'API',
        port: Number.parseInt(process.env.PORT),
        exceptionFilters: [],
        module: APIModule,
        cors: ServerUtilities.getSwaggerUrls(process.env.ENVIRONMENT as ServerEnvironment),
        swagger: {
            path: '/swagger',
            title: 'convictions.ai API',
            description: 'convictions.ai API',
            version: '0.0.1',
            tags: [],
            contactName: 'convictions.ai Support',
            contactEmail: 'support@convictions.ai',
            contactUrl: 'https://support.convictions.ai',
            docsDescription: 'docs',
            docsUrl: 'https://support.convictions.ai',
            serverUrls: ServerUtilities.getSwaggerUrls(process.env.ENVIRONMENT as ServerEnvironment)
        }
    })
);
