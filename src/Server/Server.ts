import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { ServerConfig } from './ServerConfig';

dotenv.config();

export class Server {
    public static async bootstrap(config: ServerConfig): Promise<NestExpressApplication> {
        const app = await NestFactory.create<NestExpressApplication>(config.module, config.options);

        if (config.cors) {
            app.enableCors(config.cors);
        }

        if (config.swagger) {
            // if (config.swagger.authentication) {
            //     app.use(
            //         config.swagger.authentication.endpoints,
            //         basicAuth({
            //             challenge: true,
            //             users: {
            //                 ...config.swagger.authentication.users
            //             }
            //         })
            //     );
            // }

            const documentBuilder = new DocumentBuilder()
                .setTitle(config.swagger.title)
                .setContact(config.swagger.contactName, config.swagger.contactUrl, config.swagger.contactEmail)
                .setDescription(config.swagger.description)
                .setExternalDoc(config.swagger.docsDescription, config.swagger.docsUrl)
                .setVersion(config.swagger.version)
                .addBearerAuth(
                    {
                        type: 'http',
                        name: 'Bearer',
                        description: 'JWT Token',
                        in: 'header'
                    },
                    'jwt'
                )
                .addApiKey(
                    {
                        type: 'apiKey',
                        name: 'apiKey',
                        description: 'API key',
                        in: 'header'
                    },
                    'key'
                );

            config.swagger.serverUrls.forEach(url => documentBuilder.addServer(url));

            Object.keys(config.swagger.tags).forEach(key => {
                documentBuilder.addTag(key, config.swagger.tags[key]);
            });

            SwaggerModule.setup(config.swagger.path, app, SwaggerModule.createDocument(app, documentBuilder.build(), config.swagger.documentOptions), config.swagger.customOptions);
        }

        if (config.upload) {
            app.use(bodyParser.json({ limit: config.upload.limit }));
            app.use(bodyParser.urlencoded({ limit: config.upload.limit, extended: true }));
        }

        if (config.interceptors) {
            app.useGlobalInterceptors(...config.interceptors);
        }

        if (config.globalPipes) {
            app.useGlobalPipes(...config.globalPipes);
        }

        if (config.exceptionFilters) {
            app.useGlobalFilters(...config.exceptionFilters);
        }

        if (config.middlewares) {
            app.use(...config.middlewares);
        }

        app.disable('x-powered-by');

        await app.listen(config.port);

        console.log(`${new Date().toISOString()} ${config.name} server started on port ${config.port}`);

        return app;
    }
}
