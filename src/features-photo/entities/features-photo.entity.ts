import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class FeaturesPhoto {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the plan',
  })
  _id: string;

  @ApiProperty({
    example: 'ওজন কমানো আপডেট করা হয়েছে',
    description: 'The full title of the plan',
  })
  @Prop()
  image: string;

  @ApiProperty({
    example: 'weight loss updated',
    description: 'The full title of the plan',
  })
  @Prop()
  catagory: string;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the plan was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the plan was last updated',
  })
  updatedAt: Date;
}
export const FeaturesPhotoSchema = SchemaFactory.createForClass(FeaturesPhoto);