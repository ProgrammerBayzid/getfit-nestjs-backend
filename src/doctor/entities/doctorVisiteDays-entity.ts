import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class doctorVisiteDays {
  @Prop({ default: null })
  @ApiProperty({
    example: 'শনি',
    description: 'the start day .',
  })
  @IsString()
  startTime: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'শুক্র',
    description: 'the end day .',
  })
  @IsString()
  endTime: string;

  @Prop({
    type: [],
  })
  @ApiProperty({
    type: [],
    description: 'The visite Days of the doctor',
  })
  visitDays: [];
}
export const createDefaultDoctorVisiteDays = (): doctorVisiteDays => ({
  startTime: null,
  endTime: null,
  visitDays: [],
});
