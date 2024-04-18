import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Package } from 'src/package/entities/package.entity';
export class CreatePlanDto {
  @ApiProperty({
    example: 'ওয়েট',
    description: 'The full title of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly title_bn: string;

  @ApiProperty({
    example: 'weight loss',
    description: 'The full title of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly title_en: string;

  @ApiProperty({
    example:
      'Small steps, big successes. Lose fat, increase speed, new picture of healthy life. Not weight, the goal is health, the obstacle will win!',
    description: 'The details of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly details_en: string;

  @ApiProperty({
    example:
      'ছোট ছোট পদক্ষেপ, বড় মাপের সাফল্য। ঝরুক মেদ, বাড়ুক গতি, সুস্থ জীবনের নতুন ছবি। ওজন নয়, লক্ষ্য হোক সুস্থতা, জয় হবেই প্রতিবন্ধকতা!',
    description: 'The details of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly details_bn: string;

  @ApiProperty({
    example: 'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the plan',
  })
  @IsString()
  @IsOptional()
  readonly image: string;

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the plan',
  })
  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  readonly packages: Package;
}
