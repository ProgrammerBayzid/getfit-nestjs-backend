import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { NotificationEnum } from '../entities/notification.entity';

export class UpdateNotificationDto {
  @ApiProperty({
    example: 'bayzid waiting for appointment',
    description: 'The notification Title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'bayzid waiting for appointment',
    description: 'The notification body',
  })
  @IsOptional()
  @IsString()
  notificationBody?: string;

  @ApiProperty({
    example: 'data',
    description: 'The notification data',
  })
  @IsOptional()
  @IsString()
  data?: string;

  @ApiProperty({
    description: 'The type of notification',
    enum: NotificationEnum,
  })
  @IsOptional()
  @IsEnum(NotificationEnum)
  type?: NotificationEnum;
}
