import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Unique } from 'typeorm';
import { EntityBase } from '../../EntityBase';
import { Bible } from '../Bible';
import { Category } from './Category';
import { Chapter } from './Chapters/Chapter';
import { Section } from './Section';

@Entity('bibles_books')
@Unique(['bible', 'number'])
export class Book extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Bible)
    public bible: Bible;

    @ApiProperty()
    @Column()
    public number: number;

    @ApiProperty()
    @Column({ nullable: true})
    public name: string;

    @ApiProperty()
    @Column({ nullable: true})
    public description?: string;

    @ApiProperty()
    @ManyToMany(() => Chapter, { cascade: true, onUpdate: 'CASCADE'})
    public chapters: Chapter[];

    /**
     * The theme of the book.
     * @example "Letters to churches or individuals"
     */
    @ApiProperty()
    @Column({ nullable: true})
    public theme?: string;

    @ApiProperty({ enum: Section })
    @Column({ nullable: true})
    public section?: Section;

    @ApiProperty({ enum: Category })
    @Column({ nullable: true})
    public category?: Category;
}
