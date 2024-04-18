import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Package } from 'src/package/entities/package.entity';

export class CreateAppoinmentDto {
  @ApiProperty({
    example: 'package or onetime',
    description: 'The type can be onetime or package',
  })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title english',
  })
  @IsString()
  @IsOptional()
  readonly packageTitle_en: string;

  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title bangla',
  })
  @IsString()
  @IsOptional()
  readonly packageTitle_bn: string;

  @ApiProperty({
    example: 5000,
    description: 'The buy package price',
  })
  @IsNumber()
  @IsOptional()
  readonly packagePrice: number;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The ID of the doctor under whom you want to make an appointment',
  })
  @IsString()
  @IsNotEmpty()
  readonly doctorId: Doctor;


  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The ID of the preferred package',
  })
  @IsString()
  @IsOptional()
  packageId?: Package;

  @ApiProperty({
    example: 1,
    description: 'Expiry date of the package',
  })
  @IsNumber()
  @IsOptional()
  readonly expiredDuration?: number;


  @ApiProperty({
    example: 'শনি',
    description: 'The Booked visit Days of Patient.',
  })
  @IsString()
  @IsOptional()
  readonly visitPatientDays?: string; 

  @ApiProperty({
    example: 'visiting reason',
    description: 'The visiting reason of Patient.',
  })
  @IsString()
  @IsOptional()
  readonly visitingReason?: string;


   @ApiProperty({
    example: 'problem Details',
    description: 'The problem Details of Patient.',
  })
  @IsString()
  @IsOptional()
  readonly problemDetails?: string;

  @ApiProperty({
    type: [],
    description: 'The image of patient',
  })
  @IsOptional()
  image: [];

  @ApiProperty({
    example: '11:55 AM',
    description: 'The Booked visit time of Patient.',
  })
  @IsString()
  @IsOptional()
  readonly visitPatientHours?: string;
}
