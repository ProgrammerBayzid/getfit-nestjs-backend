import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDoctorConsultationFeeDto {
  @ApiProperty({
    example: 550,
    description: 'The consultation Fee of the doctor',
  })
  @IsOptional()
  @IsNumber()
  consultationFee?: number;

  @ApiProperty({
    example: 200,
    description: 'The follow Up Fee of the doctor',
  })
  @IsOptional()
  @IsNumber()
  followUpFee?: number;

  @ApiProperty({
    example: 200,
    description: 'The Discount Fee of the doctor',
  })
  @IsOptional()
  @IsNumber()
  discountFee?: number;

  @ApiProperty({
    example: '12',
    description: 'The Expiration of Discount Fee of the doctor',
  })
  @IsOptional()
  @IsString()
  expirationOfDiscountFee?: string;

  @ApiProperty({
    example: '15',
    description: 'The Average Consultation Duration/Client of the doctor',
  })
  @IsOptional()
  @IsString()
  duration?: string;
}
