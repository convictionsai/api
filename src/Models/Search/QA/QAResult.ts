import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';
import { Book } from '../../Bibles/Books/Book';
import { EntityBase } from '../../EntityBase';
import { QAHitType } from './QAHitType';
import { QAResultStatus } from './QAResultStatus';

@Entity('search_results_qa')
@Unique(['prompt'])
export class QAResult extends EntityBase {
    @ApiProperty()
    @Column()
    public hash: string;

    @ApiProperty()
    @Column()
    public prompt: string;

    @ApiProperty()
    @Column({ type: 'text' })
    public answer: string;

    @ApiProperty()
    @Column()
    public tokens: number;

    @ApiProperty()
    @Column()
    public time: number;

    @ApiProperty({ enum: QAResultStatus })
    @Column()
    public status: QAResultStatus;

    @ApiProperty()
    @ManyToMany(() => Book, { cascade: true, onUpdate: 'CASCADE'})
    @JoinTable({
        name: 'search_results_qa_books_links',
        joinColumn: { name: 'qaResultId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' }
    })
    public books: Book[];

    @ApiProperty()
    @Column()
    public hit: QAHitType;
}
