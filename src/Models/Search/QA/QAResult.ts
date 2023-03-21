import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Unique } from 'typeorm';
import { EntityBase } from '../../EntityBase';
import { QAHitType } from './QAHitType';
import { QAResultStatus } from './QAResultStatus';

@Entity('search_results_qa')
@Unique(['prompt'])
export class QAResult extends EntityBase {
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

    public hit: QAHitType;
}
