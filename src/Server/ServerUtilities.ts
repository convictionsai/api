import { ServerEnvironment } from './ServerEnvironment';

export class ServerUtilities {
    public static getSwaggerUrls(environment: ServerEnvironment): Array<string> {
        if (environment === ServerEnvironment.LOCAL) {
            return [`http://localhost:${process.env.PORT}`];
        } else if (environment === ServerEnvironment.DOCKER) {
            return ['http://localhost:18080'];
        } else if (environment === ServerEnvironment.DEVELOPMENT) {
            return ['https://dev-api.convictions.ai'];
        } else if (environment === ServerEnvironment.STAGING) {
            return ['https://staging-api.convictions.ai'];
        } else if (environment === ServerEnvironment.PRODUCTION) {
            return ['https://api.convictions.ai'];
        }
    }

    public static getCorsOrigins(environment: ServerEnvironment): Array<string> {
        if (environment === ServerEnvironment.LOCAL) {
            return ['http://localhost:4200'];
        } else if (environment === ServerEnvironment.DOCKER) {
            return ['http://localhost:4200', 'http://localhost:18080/app'];
        } else if (environment === ServerEnvironment.DEVELOPMENT) {
            return ['http://localhost:4200', 'https://dev-app.convictions.ai'];
        } else if (environment === ServerEnvironment.STAGING) {
            return ['https://staging-app.convictions.ai'];
        } else if (environment === ServerEnvironment.PRODUCTION) {
            return ['https://app.convictions.ai'];
        }
    }
}
