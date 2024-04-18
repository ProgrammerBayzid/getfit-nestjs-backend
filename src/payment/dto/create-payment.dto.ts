import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Package } from 'src/package/entities/package.entity';

export class CreatePaymentDto {
  @ApiProperty({
    example: 'package or appoinment',
    description: 'The type can be onetime or package',
  })
  @IsString()
  @IsNotEmpty()
  readonly type: string;


  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title english',
  })
  @IsString()
  @IsOptional()
  readonly packageTitle_en: string;

  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title bangla',
  })
  @IsString()
  @IsOptional()
  readonly packageTitle_bn: string;

  @ApiProperty({
    example: '',
    description: 'Patient visiting Reason',
  })
  @IsOptional()
  @IsNotEmpty()
  readonly visitingReason: string;

  @ApiProperty({
    example: '',
    description: 'Patient Payment transaction Id',
  })
  @IsString()
  @IsNotEmpty()
  readonly trxId: string;

  @ApiProperty({
    example: '',
    description: 'Patient Payment receipt Number',
  })
  @IsString()
  @IsNotEmpty()
  receiptNum: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The selected package id use hear',
  })
  @IsString()
  @IsOptional()
  readonly packageId: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The appoinment id',
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
    example: '1',
    description: '',
  })
  @IsString()
  @IsOptional()
  expiredDuration: string;

  @ApiProperty({
    example: '7530',
    description: 'The total of the payment',
  })
  @IsString()
  @IsNotEmpty()
  readonly total: string;

  @ApiProperty({
    example: '562785',
    description: 'The promoCode of the payment',
  })
  @IsString()
  @IsOptional()
  readonly promoCode: string;

  @ApiProperty({
    example: 'bkash',
    description: 'The paymentMethod of the payment',
  })
  @IsString()
  @IsNotEmpty()
  readonly paymentMethod: string;
}