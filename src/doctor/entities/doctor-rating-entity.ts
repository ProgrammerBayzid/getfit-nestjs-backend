import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class doctorRating {
  @Prop({ default: null })
  @ApiProperty({
    example: 4.5,
    description: 'The rating of the doctor',
  })
  @IsNumber()
  rating: number;

  @Prop({ default: null })
  @ApiProperty({
    example: 45,
    description: 'The Total Rating of the doctor',
  })
  @IsNumber()
  totalRating: number;

  @Prop({ default: null })
  @ApiProperty({
    example: 4.9,
    description: 'The Average Rating of the doctor',
  })
  @IsNumber()
  averageRating: number;
}

export const createDefaultDoctorRating = (): doctorRating => ({
  rating: 0,

  totalRating: 0,

  averageRating: 0,
});
