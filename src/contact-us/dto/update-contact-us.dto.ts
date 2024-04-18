import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContactUsDto } from './create-contact-us.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateContactUsDto extends PartialType(CreateContactUsDto) {
  @ApiProperty({
    example: '',
    description: 'The massage of the ContactUs',
  })
  @IsOptional()
  @IsString()
  massage?: string;
}
