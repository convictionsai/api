import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { EntityBase } from '../../EntityBase';
import { Bible } from '../Bible';
import { Category } from './Category';
import { Section } from './Section';

@Entity('bibles_books')
@Unique(['bible', 'name'])
export class Book extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Bible)
    public bible: Bible;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public description: string;

    /**
     * The theme of the book.
     * @example "Letters to churches or individuals"
     */
    @ApiProperty()
    @Column()
    public theme: string;

    @ApiProperty()
    @Column({ enum: Section })
    public section: Section;

    @ApiProperty()
    @Column({ enum: Category })
    public category: Category;
}
