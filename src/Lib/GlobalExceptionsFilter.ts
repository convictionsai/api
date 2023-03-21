import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { LogContextType } from '@nvr-ai/common/Monitoring/Logging/LogContextType';
import { LoggingClient } from '@nvr-ai/common/Monitoring/Logging/LoggingClient';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    public catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request: Request = ctx.getRequest<Request>();
        const response: Response = ctx.getResponse<Response>();
        const clazz = exception.constructor.name;

        console.log(typeof exception.message);
        const log = {
            date: new Date(),
            source: request.ip,
            url: request.url,
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body).slice(0, 1000),
            exception: exception.message,
            status: exception.status,
            clazz: clazz
        };

        LoggingClient.warning(LogContextType.SECURITY, request.path, log);

        if (process.env.DEBUG) {
            console.error(`GlobalExceptionsFilter.catch()`, log);
        }

        if (clazz === 'UnauthorizedException') {
            response.sendStatus(401);
        } else if (clazz === 'BadRequestException') {
            response.sendStatus(400);
        } else if (clazz === 'ResourceNotFoundException') {
            response.sendStatus(exception.status);
        } else if (clazz === 'ResourceForbiddenException') {
            response.sendStatus(exception.status);
        } else if (clazz === 'EntityNotFoundError') {
            response.sendStatus(HttpStatus.NOT_FOUND);
        } else if (clazz === 'ResourceAlreadyExistsException') {
            response.sendStatus(exception.status);
        } else if (clazz === 'QueryFailedError') {
            if (exception.message.indexOf('duplicate key') >= -1) {
                response.sendStatus(HttpStatus.CONFLICT);
            }
        } else if (exception.status) {
            response.sendStatus(exception.status);
        } else {
            response.sendStatus(500);
        }
    }
}
