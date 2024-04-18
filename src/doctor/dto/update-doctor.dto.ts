import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { UpdateDoctorVisiteDaysDto } from './update-doctorVisiteDays';
import { UpdateDoctorConsultationFeeDto } from './update-doctor-consultation-fee';
import { UpdateDoctorBankAccountDto } from './update-doctor-bank-account';

export class UpdateDoctorDto {
  @ApiProperty({
    example: 'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the doctor',
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'Rubaiyat Khan',
    description: 'The full name in English of the doctor',
  })
  @IsString()
  @IsOptional()
  name_en?: string;

  @ApiProperty({
    example: 'রুবাইয়াত খান',
    description: 'The full name in Bangla of the doctor',
  })
  @IsString()
  @IsOptional()
  name_bn?: string;

  @ApiProperty({
    example: 'BSC, MSC',
    description: 'The degree in english of the doctor',
  })
  @IsString()
  @IsOptional()
  degree_en?: string;

  @ApiProperty({
    example: 'বিএসসি, এমএসসি',
    description: 'The degree in Bangla of the doctor',
  })
  @IsString()
  @IsOptional()
  degree_bn?: string;

  @ApiProperty({
    example: 'Food & Nutrition Science',
    description: 'The subject in English of the doctor',
  })
  @IsString()
  @IsOptional()
  subject_en?: string;

  @ApiProperty({
    example: 'ফুড এন্ড নিউট্রিশন সায়েন্স',
    description: 'The subject in Bangla of the doctor',
  })
  @IsString()
  @IsOptional()
  subject_bn?: string;

  @ApiProperty({
    example: 'patuakhali',
    description: 'The location of the doctor',
  })
  @IsString()
  @IsOptional()
  location?: string;


  @ApiProperty({
    example: 'write about you',
    description: 'write about doctor',
  })
  @IsString()
  @IsOptional()
  doctorInfo?: string;

  @ApiProperty({
    type: [],
    description: 'The Educational Qualifications of the doctor',
  })
  @IsOptional()
  education?: [];

  @ApiProperty({
    type: [],
    description: 'The work Experience of the doctor',
  })
  @IsOptional()
  workExperience?: [];

  @ApiProperty({
    type: [],
    description: 'The Identity Information of the doctor',
  })
  @IsOptional()
  identity?: [];


  @ApiProperty({
    type: [],
    description: 'The Educational Certificate of the doctor',
  })
  @IsOptional()
  educationalCertificate?: [];




  @ApiProperty({
    required: false,
    type: [String], 
    description: 'The speciality IDs of the doctor',
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly speciality?: mongoose.Schema.Types.ObjectId[];

  @ApiProperty({
    type: UpdateDoctorVisiteDaysDto,
    description: 'The doctor Visite Days',
  })
  @IsOptional()
  visitPatientDays?: UpdateDoctorVisiteDaysDto;

  @ApiProperty({
    type: UpdateDoctorConsultationFeeDto,
    description: 'The doctor Consultation Fee',
  })
  @IsOptional()
  consultationFee?: UpdateDoctorConsultationFeeDto;


  @ApiProperty({
    type: UpdateDoctorBankAccountDto,
    description: 'The doctor bank account ',
  })
  @IsOptional()
  bankAccount?: UpdateDoctorBankAccountDto;

  @ApiProperty({
    example: 'Male',
    description: 'The gender of the doctor',
  })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({
    example: '2002',
    description: 'The Date of Birth of the doctor',
  })
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({
    example: '846583936746589',
    description: 'The nid Or Passport number of the doctor',
  })
  @IsString()
  @IsOptional()
  nidOrPassport?: string;

  @ApiProperty({
    example: '01676485383',
    description: 'The number of the doctor',
  })
  @IsString()
  @IsOptional()
  mobile?: string;


}
