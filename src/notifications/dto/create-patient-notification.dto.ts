import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { PatientNotificationEnum } from '../entities/patient-notification.entity';

export class CreatePatientNotificationDto {
  @ApiProperty({
    example: 'bayzid waiting for appointment',
    description: 'The notification Title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'bayzid waiting for appointment',
    description: 'The notification body',
  })
  @IsString()
  @IsNotEmpty()
  notificationBody: string;

  @ApiProperty({
    example: 'data',
    description: 'The notification data',
  })
  @IsString()
  @IsNotEmpty()
  data: string;

  @ApiProperty({
    description: 'The type of patient notification',
    enum: PatientNotificationEnum,
    default: PatientNotificationEnum.appointment,
  })
  @IsEnum(PatientNotificationEnum)
  @IsNotEmpty()
  type: PatientNotificationEnum;
}