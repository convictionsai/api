import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

export class SwaggerSettings {
    public path: string;
    public title: string;
    public description: string;
    public version: string;
    public tags?: any;
    public contactName: string;
    public contactUrl: string;
    public contactEmail: string;
    public docsDescription: string;
    public docsUrl: string;
    public serverUrls: Array<string>;
    public documentOptions?: SwaggerDocumentOptions;
    public customOptions?: SwaggerCustomOptions;

    public authentication?: {
        endpoints: Array<string>;
        users: { [key: string]: string };
    };
}
