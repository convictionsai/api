import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { Language } from '../Languages/Language';

export class BibleCreate {
    @ApiProperty()
    @Length(1, 255)
    public name: string;

    @ApiProperty()
    @Length(1, 255)
    public description: string;

    @ApiProperty({ enum: Language})
    @IsEnum(Language)
    public language: Language;
}
