import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Unique } from 'typeorm';
import { EntityBase } from '../EntityBase';
import { Language } from '../Languages/Language';

@Entity('bibles')
@Unique(['name'])
export class Bible extends EntityBase {
    @ApiProperty()
    @Column()
    public name: string;

    @ApiProperty()
    @Column()
    public description: string;

    @ApiProperty({ enum: Language })
    @Column({ type: 'enum', enum: Language })
    public language: Language;
}
