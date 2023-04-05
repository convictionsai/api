import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../Bibles/Books/Book';

export class SearchOptions {
    @ApiProperty()
    public books: Book[];
}
