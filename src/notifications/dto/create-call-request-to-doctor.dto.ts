import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDoctorRequestNotificationDto {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The doctor id',
  })
  @IsString()
  doctorId: string;
}
