import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationEnum } from '../entities/notification.entity';

export class CreateNotificationDto {
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
    description: 'The type of notification',
    enum: NotificationEnum,
    default: NotificationEnum.appointment,
  })
  @IsEnum(NotificationEnum)
  @IsNotEmpty()
  type: NotificationEnum;
}
