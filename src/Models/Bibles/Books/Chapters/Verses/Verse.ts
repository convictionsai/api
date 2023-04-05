import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { EntityBase } from '../../../../EntityBase';
import { Chapter } from '../Chapter';

@Entity('bibles_books_chapters_verses')
@Unique([ 'chapter', 'content' ])
export class Verse extends EntityBase {
    @ApiProperty()
    @ManyToOne(() => Chapter)
    public chapter?: Chapter;

    @ApiProperty()
    @Column()
    public number: number;

    @ApiProperty()
    @Column({ nullable: true })
    public description?: string;

    @ApiProperty()
    @Column()
    public content: string;
}
