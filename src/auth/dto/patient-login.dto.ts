import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class PatientLoginDto {
  @ApiProperty({ example: '01676485383', description: 'patient number ' })
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty({ example: '1234', description: ' otp' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}
