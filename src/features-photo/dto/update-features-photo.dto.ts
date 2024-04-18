import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeaturesPhotoDto } from './create-features-photo.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFeaturesPhotoDto extends PartialType(CreateFeaturesPhotoDto) {


    @ApiProperty({
        example: 'ওয়েট',
        description: 'The full title of the plan',
      })
      @IsString()
      @IsOptional()
      readonly image: string;
    
      @ApiProperty({
        example: 'weight loss',
        description: 'The full title of the plan',
      })
      @IsString()
      @IsOptional()
      readonly catagory: string;


}

