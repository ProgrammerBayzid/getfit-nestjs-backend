import { Package } from 'src/package/entities/package.entity';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class Plan {
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
  title_bn: string;

  @ApiProperty({
    example: 'weight loss updated',
    description: 'The full title of the plan',
  })
  @Prop()
  title_en: string;

  @ApiProperty({
    example: 'ওজন কমানো আপডেট করা হয়েছে',
    description: 'The full title of the plan',
  })
  @Prop()
  details_bn: string;

  @ApiProperty({
    example:
      'Small steps, big successes. Lose fat, increase speed, new picture of healthy life. Not weight, the goal is health, the obstacle will win!',
    description: 'The details of the plan',
  })
  @Prop()
  details_en: string;

  @ApiProperty({
    example: 'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/updated-image.png',
    description: 'The image of the plan',
  })
  @Prop()
  image: string;

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the plan',
  })
  @Prop()
  icon: string;

  @ApiProperty({
    type: Package,
    description: 'The packages associated with the plan',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package' })
  packages: mongoose.Schema.Types.ObjectId;

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
export const PlanSchema = SchemaFactory.createForClass(Plan);

PlanSchema.pre('findOne', autoPopulate);
PlanSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('packages');
  next();
}
