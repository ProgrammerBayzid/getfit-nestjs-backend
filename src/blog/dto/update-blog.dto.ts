

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { Plan } from 'src/plan/entities/plan.entity';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    example: 'কিভাবে এক সপ্তাহে ৩ কেজি কমানো যায়!',
    description: 'The title of the blog',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsOptional()
  @IsString()
  authorName?: string;

  @ApiProperty({
    example:
      'প্রতি কেজি চর্বি ঝরাতে ৭৭০০ ক্যালরি খরচ করার দরকার পড়ে। অর্থাৎ সপ্তাহান্তে যদি আপনার ক্যালরি ঘাটতি ৭৭০০-১৫৪০০ রাখতে পারেন তাহলে সপ্তাহে ১-২ কেজি ওজন কমাতে পারবেন। বেশ কয়েকটি উপায়ে এত বেশি পরিমানে ক্যালরির ঘাটতি রাখা যেতে পারে।',
    description: 'The details of the Blog',
  })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({
    example: 'Fitness',
    description: 'The category of the Blog',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The first image of the Blog',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;



 
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The ID of the associated plan',
  })
  @IsOptional()
  @IsString()
  plan?: string;
}
