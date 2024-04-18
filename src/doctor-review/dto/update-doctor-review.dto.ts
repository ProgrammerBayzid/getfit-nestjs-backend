import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDoctorReviewDto } from './create-doctor-review.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorReviewDto extends PartialType(CreateDoctorReviewDto) {
  @ApiProperty({
    example: 4.5,
    description: 'The rating of the doctor',
  })
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty({
    example: '',
    description: 'The review of the doctor',
  })
  @IsString()
  @IsOptional()
  review: string;
}
