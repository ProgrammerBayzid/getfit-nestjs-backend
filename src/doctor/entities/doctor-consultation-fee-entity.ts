import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class doctorConsultationFee {
  @Prop({ default: null })
  @ApiProperty({
    example: '550',
    description: 'The consultation Fee of the doctor',
  })
  @IsNumber()
  consultationFee: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '200',
    description: 'The follow Up Fee of the doctor',
  })
  @IsNumber()
  followUpFee: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '15',
    description: 'The followUp days.',
  })
  @IsString()
  followUpDays: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '200',
    description: 'The Discount Fee of the doctor',
  })
  @IsNumber()
  discountFee: string;

  @Prop({ default: '1' })
  @ApiProperty({
    example: '12',
    description: 'The Expiration of Discount Fee of the doctor',
  })
  @IsString()
  expirationOfDiscountFee: string;

  @Prop({ default: '1' })
  @ApiProperty({
    example: '15',
    description: 'The Average Consultation Duration/Client of the doctor',
  })
  @IsString()
  duration: string;
}
export const createDefaultDoctorConsultationFee =
  (): doctorConsultationFee => ({
    consultationFee: null,

    followUpFee: null,

    discountFee: null,

    expirationOfDiscountFee: null,

    duration: null,

    followUpDays: null,
  });
