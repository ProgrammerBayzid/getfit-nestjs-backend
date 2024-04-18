import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateDoctorDto {
  @ApiProperty({ example: 'test@test.com', description: 'Email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;


  @ApiProperty({
    example: 'DT2056',
    description: 'The Doctor unique ID',
  })
  @IsString()
  @IsNotEmpty()
  uniqueId: string;


}
