import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDoctorVisiteDaysDto {
  @ApiProperty({
    example: 'শনি',
    description: 'the start day.',
  })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiProperty({
    example: 'শুক্র',
    description: 'the end day.',
  })
  @IsOptional()
  @IsString()
  endTime?: string;

  @ApiProperty({
    example: '15',
    description: 'The followUp days.',
  })
  @IsOptional()
  @IsString()
  followUpDays?: string;

  @ApiProperty({
    type: [],
    description: 'The visite Days list of the doctor',
  })
  @IsOptional()
  visitDays?: [];
}
