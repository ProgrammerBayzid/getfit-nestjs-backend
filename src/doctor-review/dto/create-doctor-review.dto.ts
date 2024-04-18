import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

export class CreateDoctorReviewDto {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The doctor id of the doctor',
  })
  @IsString()
  @IsNotEmpty()
  doctorId: Doctor;


  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The patient appoinment id of the doctor review',
  })
  @IsString()
  @IsNotEmpty()
  appoinmentId: Appoinment;

  @ApiProperty({
    example: 4.5,
    description: 'The rating of the doctor',
  })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    example: '',
    description: 'The review of the doctor',
  })
  @IsString()
  @IsOptional()
  review?: string;
}
