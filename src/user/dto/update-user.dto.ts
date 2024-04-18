import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'bayzid',
    description: 'The name of the user',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the user',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: '01676485383',
    description: 'The mobile number of the user',
  })
  @IsString()
  @IsOptional()
  mobile: string;

  @ApiProperty({
    example: 'bayzid@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'Male',
    description: 'The gender of the user',
  })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({
    example: 21,
    description: 'The age In Month of the user',
  })
  @IsNumber()
  @IsOptional()
  ageInYear: number;

  @ApiProperty({
    example: 8,
    description: 'The age In Month of the user',
  })
  @IsNumber()
  @IsOptional()
  ageInMonth: number;

  @ApiProperty({
    example: 5,
    description: 'The height In Feet of the user',
  })
  @IsNumber()
  @IsOptional()
  heightInFeet: number;

  @ApiProperty({
    example: 6,
    description: 'The height In Inch of the user',
  })
  @IsNumber()
  @IsOptional()
  heightInInch: number;

  @ApiProperty({
    example: 53,
    description: 'The weight In Kg of the user',
  })
  @IsNumber()
  @IsOptional()
  weightInKg: number;

  @ApiProperty({
    example: 'A+',
    description: 'The blood Group of the user',
  })
  @IsString()
  @IsOptional()
  bloodGroup: string;

  @ApiProperty({
    example: 'Single',
    description: 'The metrial Status of the user',
  })
  @IsString()
  @IsOptional()
  maritalStatus: string;


  @ApiProperty({
    example: 22,
    description: 'The bmi of the user',
  })
  @IsNumber()
  @IsOptional()
  bmi: number;
}
