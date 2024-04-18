

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, isNotEmpty, IsNotEmpty } from 'class-validator';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Plan } from 'src/plan/entities/plan.entity';

export class CreateBlogDto {

  @ApiProperty({
    example: 'কিভাবে এক সপ্তাহে ৩ কেজি কমানো যায়!',
    description: 'The title of the blog',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    example: 'প্রতি কেজি চর্বি ঝরাতে ৭৭০০ ক্যালরি খরচ করার দরকার পড়ে। অর্থাৎ সপ্তাহান্তে যদি আপনার ক্যালরি ঘাটতি ৭৭০০-১৫৪০০ রাখতে পারেন তাহলে সপ্তাহে ১-২ কেজি ওজন কমাতে পারবেন। বেশ কয়েকটি উপায়ে এত বেশি পরিমানে ক্যালরির ঘাটতি রাখা যেতে পারে।',
    description: 'The details of the Blog',
  })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The image2 first of the Blog',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  image?: string;



  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The ID of the associated plan',
  })
  @IsString()
  plan: string;
}
