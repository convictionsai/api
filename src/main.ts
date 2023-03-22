require('dotenv').config({ path: `.env.${process.env.ENVIRONMENT}` });

import { APIModule } from './APIModule';
import { Server } from './Server/Server';
import { ServerConfig } from './Server/ServerConfig';
import { ServerEnvironment } from './Server/ServerEnvironment';
import { ServerUtilities } from './Server/ServerUtilities';

void Server.bootstrap(
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
