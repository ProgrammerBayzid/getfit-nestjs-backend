import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppoinmentDto } from './create-appoinment.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Doctor } from 'src/doctor/entities/doctor.entity';

class UpdateDoctorAdviceEntityDto {
  @ApiProperty({ example: '', description: 'The details of the FollowUp' })
  @IsOptional()
  @IsString()
  readonly details?: string;

  @ApiProperty({ example: '', description: 'The price of the FollowUp' })
  @IsOptional()
  @IsString()
  readonly followUpDate?: string;

  @ApiProperty({
    example: ['image.png'],
    description: 'The Add Diet/Advice Chart image',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  readonly image?: string[];
}
export class UpdateAppoinmentDto extends PartialType(CreateAppoinmentDto) {
  @ApiProperty({
    example: 'package or onetime',
    description: 'The type can be onetime or package',
  })
  @IsString()
  @IsOptional()
  readonly type: string;

  @ApiProperty({
    type: [UpdateDoctorAdviceEntityDto],
    description: 'The price and duration of the package',
  })
  @IsOptional()
  readonly doctorAdvice?: UpdateDoctorAdviceEntityDto[];

  @ApiProperty({
    example: 'শনি',
    description: 'The Booked visit Days of Patient.',
  })
  @IsString()
  @IsOptional()
  readonly visitPatientDays: string;

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

  @IsOptional()
  @ApiProperty({
    example: '11:55 AM',
    description: 'The Booked visit Hour of Patient.',
  })
  readonly visitPatientHours: string;
}
