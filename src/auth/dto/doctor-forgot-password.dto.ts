import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class DoctorForgotPasswordDto {
  @ApiProperty({ example: 'test@test.com', description: 'Email of the Doctor' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
