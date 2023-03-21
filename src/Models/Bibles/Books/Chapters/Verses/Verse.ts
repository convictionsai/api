import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { EntityBase } from '../../../../EntityBase';
import { Chapter } from '../Chapter';

@Entity('bibles_books_chapters')
@Unique(['bible', 'name'])
export class Verse extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Chapter)
    public chapter: Chapter;

    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public description: string;

    @ApiProperty()
    @Column()
    public content: string;
}
