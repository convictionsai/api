import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, Length } from 'class-validator';

export class QARequest {
    @ApiProperty()
    @Length(1, 255)
    public prompt: string;

    @ApiProperty()
    @IsArray({ each: true })
    @IsOptional({ each: true })
    public books?: string[];
}
