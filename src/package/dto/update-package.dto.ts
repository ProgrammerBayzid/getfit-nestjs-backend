import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { CreatePackageDto } from './create-package.dto';

class PriceAndDurationDto {
  @ApiProperty({ example: 100, description: 'The price of the package' })
  @IsNumber()
  @IsOptional()
  price_bn: number;

  @ApiProperty({ example: 100, description: 'The price of the package' })
  @IsNumber()
  @IsOptional()
  price_en: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  @IsNumber()
  @IsOptional()
  duration_bn: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  @IsNumber()
  @IsOptional()
  duration_en: number;
}

class DetailsPoint {

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  @IsString()
  @IsOptional()
  point_bn: string;

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  @IsString()
  @IsOptional()
  point_en: string;

  @ApiProperty({ example: 3, description: 'The package duration' })
  @IsNumber()
  @IsOptional()
  tik: number;
}
export class UpdatePackageDto extends PartialType(CreatePackageDto) {
  @ApiProperty({
    example: 'ওয়েট লস পাকেজ',
    description: 'The title of the package',
  })
  @IsString()
  @IsOptional()
  readonly title_bn: string;

  @ApiProperty({
    example: 'weight loss package',
    description: 'The title of the package',
  })
  @IsString()
  @IsOptional()
  readonly title_en: string;

  @ApiProperty({
    example: 'description in english',
    description: 'The description of the package',
  })
   @IsString()
   @IsOptional()
  description_en: string;

  @ApiProperty({
    example: 'description in bangla',
    description: 'The description of the package',
  })
  @IsString()
  @IsOptional()
  description_bn: string;

  @ApiProperty({
    type: [DetailsPoint],
    description: 'The price and details of object the package',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPoint)
  details: DetailsPoint[];

  @ApiProperty({
    type: [PriceAndDurationDto],
    description: 'The price and duration of the package',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PriceAndDurationDto)
  priceAndDuration: PriceAndDurationDto[];

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the package',
  })
  @IsString()
  @IsOptional()
  readonly image: string;

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the package',
  })
  @IsString()
  @IsOptional()
  readonly icon?: string;

  @ApiProperty({
    required: false,
    type: String, // Define the type as String
    description: 'The speciality IDs of the doctor',
  })
  @IsOptional()
  @IsMongoId({ each: true })
  readonly plan?: mongoose.Schema.Types.ObjectId;
}
