import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class PriceAndDurationDto {
  @ApiProperty({ example: 100, description: 'The price of the package' })
  @IsNumber()
  price_bn: number;

  @ApiProperty({ example: 100, description: 'The price of the package' })
  @IsNumber()
  price_en: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  @IsNumber()
  duration_bn: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  @IsNumber()
  duration_en: number;
}
class DetailsPoint {

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  @IsString()
  point_bn: string;

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  @IsString()
  point_en: string;

  @ApiProperty({ example: 3, description: 'The package duration' })
  @IsNumber()
  tik: number;
}
export class CreatePackageDto {
  @ApiProperty({
    example: 'ওয়েট লস পাকেজ',
    description: 'The title of the package',
  })
  @IsString()
  @IsNotEmpty()
  title_bn: string;

  @ApiProperty({
    example: 'weight loss package',
    description: 'The title of the package',
  })
  @IsString()
  @IsNotEmpty()
  title_en: string;


  @ApiProperty({
    example: 'description in english',
    description: 'The description of the package',
  })
   @IsString()
   @IsNotEmpty()
  description_en: string;

  @ApiProperty({
    example: 'description in bangla',
    description: 'The description of the package',
  })
   @IsString()
    @IsNotEmpty()
  description_bn: string;

  @ApiProperty({
    type: [PriceAndDurationDto],
    description: 'The price and duration list of object of the package',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceAndDurationDto)
  priceAndDuration: PriceAndDurationDto[];

  @ApiProperty({
    example: ' মাসের ওয়েট লস পাকেজ',
    description: 'The details list of object of the package',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPoint)
  details: DetailsPoint[];

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the package',
  })
  @IsString()
  @IsNotEmpty()
  image: string;


  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the package',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    required: false,
    type: String,
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'Pass The plan IDs which plan you want to buy',
  })
  @IsMongoId({ each: true })
  readonly plan: mongoose.Schema.Types.ObjectId;
}
