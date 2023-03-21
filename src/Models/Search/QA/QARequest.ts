import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class QARequest {
    @ApiProperty()
    @Length(1, 255)
    public prompt: string;
}
