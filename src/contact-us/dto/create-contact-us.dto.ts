import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContactUsDto {
  @ApiProperty({
    example: '',
    description: 'The massage of the ContactUs',
  })
  @IsString()
  @IsNotEmpty()
  massage: string;
}
