import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { EntityBase } from '../../../EntityBase';
import { Bible } from '../../Bible';
import { Book } from '../Book';
import { Verse } from './Verses/Verse';

@Entity('bibles_books_chapters')
@Unique(['book', 'name'])
export class Chapter extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Bible)
    public bible: Bible;

    @ApiProperty()
    @ManyToOne(() => Book)
    public book: Book;

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
    @ManyToMany(() => Verse, { cascade: true, onUpdate: 'CASCADE'})
    public verses: Verse[];
}
