import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateVerifyDto {
  @ApiProperty({
    example: true,
    description: 'The doctor verified true or false',
  })
  @IsBoolean()
  verified: boolean;
}
