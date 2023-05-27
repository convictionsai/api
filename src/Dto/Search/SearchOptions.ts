import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class SearchOptions {
    @ApiProperty()
    public books: Book[];
}
