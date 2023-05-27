import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { IsUUID } from 'class-validator';

export class BookRequest {

    /** The id of the book to be retrieved. */
    @ApiProperty(
        {
            description: 'The id of the book to be retrieved.',
            example: randomUUID(),
        },
    )
    @IsUUID()
    public id: string;

}
