export class DoctorSingUpDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EmailChangeDto {
  @ApiProperty({ example: 'test@test.com', description: 'Email of the Doctor' })
  @IsNotEmpty()
  @IsEmail()
  oldEmail: string;

  @ApiProperty({ example: 'newtest@test.com', description: 'Email of the Doctor' })
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;

  @ApiProperty({ example: '12345678', description: 'Password of the Doctor' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
