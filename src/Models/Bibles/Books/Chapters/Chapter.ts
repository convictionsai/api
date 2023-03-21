import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { EntityBase } from '../../../EntityBase';
import { Book } from '../Book';

@Entity('bibles_books_chapters')
@Unique(['bible', 'name'])
export class Chapter extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Book)
    public book: Book;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public description: string;
}
