import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePlanDto } from './create-plan.dto';
import { Package } from 'src/package/entities/package.entity';
import { IsOptional, IsString } from 'class-validator';
export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @ApiProperty({
    example: 'weight loss updated',
    description: 'The full title of the plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly title_en?: string;

  @ApiProperty({
    example: 'ওজন কমানো আপডেট করা হয়েছে',
    description: 'The full title of the plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly title_bn?: string;

  @ApiProperty({
    example:
      'Small steps, big successes. Lose fat, increase speed, new picture of healthy life. Not weight, the goal is health, the obstacle will win!',
    description: 'The details of the plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly details_en?: string;

  @ApiProperty({
    example:
      'ছোট ছোট পদক্ষেপ, বড় মাপের সাফল্য। ঝরুক মেদ, বাড়ুক গতি, সুস্থ জীবনের নতুন ছবি। ওজন নয়, লক্ষ্য হোক সুস্থতা, জয় হবেই প্রতিবন্ধকতা!',
    description: 'The details of the plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly details_bn?: string;

  @ApiProperty({
    example: 'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/updated-image.png',
    description: 'The image of the plan',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly image?: string;


  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the plan',
  })
  @IsString()
  @IsOptional()
  readonly icon?: string;

  @ApiProperty({
    type: String,
    example: 'packageId1, packageId2',
    description: 'The packages associated with the plan',
  })
  @IsOptional()
  readonly packages: Package;
}
