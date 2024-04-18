import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateFeaturesPhotoDto {
  @ApiProperty({
    example: 'ওয়েট',
    description: 'The full title of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({
    example: 'weight loss',
    description: 'The full title of the plan',
  })
  @IsString()
  @IsNotEmpty()
  readonly catagory: string;
 
}
