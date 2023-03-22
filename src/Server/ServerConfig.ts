import { ExceptionFilter, NestInterceptor, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionsFilter } from './GlobalExceptionsFilter';
import { SwaggerSettings } from './SwaggerSettings';

// export const middlewaresPlain = [compression()];

export const middlewaresJson = [
    // compression(),
    // cookieParser(),
    bodyParser.json(),
    bodyParser.urlencoded({
        type: 'application/x-www-form-urlencoded',
        extended: true
    })
];

export class ServerConfig {
    public name: string;
    public module: any;
    public port: number;
    public options?: any;
    public cors?: any;
    public upload?: { limit: string };

    public globalPipes?: Array<ValidationPipe> = [
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    ];
    public exceptionFilters?: Array<ExceptionFilter> = [new GlobalExceptionsFilter()];
    public interceptors?: Array<NestInterceptor>;
    public middlewares?: Array<any> = middlewaresJson;
    public origins?: Array<string>;
    public swagger?: SwaggerSettings;

    public constructor(config: ServerConfig) {
        Object.assign(this, config);
    }
}
