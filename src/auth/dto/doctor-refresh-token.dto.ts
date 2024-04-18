import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DoctorRefreshToeknDto {
  @ApiProperty({
    example: 'hwughffuiewehdqiwhduguiwegwieue',
    description: 'Refresh token of the loggen in user',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
