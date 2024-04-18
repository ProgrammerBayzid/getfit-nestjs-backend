import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendOTPDto {
  @ApiProperty({
    example: '01676485383',
    description: 'The phone number of the patient',
  })
  @IsString()
  mobile: string;
}
