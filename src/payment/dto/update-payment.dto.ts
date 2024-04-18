import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({
    example: '',
    description: 'The type can be onetime or package',
  })
  @IsString()
  @IsOptional()
  readonly type: string;

  @ApiProperty({
    example: '',
    description: 'Patient visiting Reason',
  })
  @IsString()
  @IsOptional()
  readonly visitingReason: string;

  @ApiProperty({
    example: '',
    description: 'Patient Payment transaction Id',
  })
  @IsString()
  @IsOptional()
  readonly trxId: string;

  @ApiProperty({
    example: '',
    description: 'Patient Payment receipt Number',
  })
  @IsString()
  @IsOptional()
  receiptNum: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The selected package id',
  })
  @IsString()
  @IsOptional()
  readonly packageId: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The appoinment id use hear',
  })
  @IsString()
  @IsOptional()
  readonly appointmentId: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The selected doctor id',
  })
  @IsString()
  @IsOptional()
  readonly doctorId: string;

  @ApiProperty({
    example: 1,
    description: 'The expiration date of the payment',
  })
  @IsNumber()
  @IsOptional()
  readonly expiredDuration: string;

  @ApiProperty({
    example: 7530,
    description: 'The total of the payment',
  })
  @IsNumber()
  @IsOptional()
  readonly total: string;

  @ApiProperty({
    example: 562785,
    description: 'The promoCode of the payment',
  })
  @IsNumber()
  @IsOptional()
  readonly promoCode: string;

  @ApiProperty({
    example: 'bkash',
    description: 'The paymentMethod of the payment',
  })
  @IsString()
  @IsOptional()
  readonly paymentMethod: string;
}
