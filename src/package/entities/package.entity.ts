import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/plan/entities/plan.entity';

class PriceAndDuration {
  @ApiProperty({ example: 100, description: 'The price of the package' })
  price_bn: number;

  @ApiProperty({ example: 100, description: 'The price of the package' })
  price_en: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  duration_bn: number;

  @ApiProperty({
    example: 30,
    description: 'The duration of the package in days',
  })
  duration_en: number;
}

class DetailsPoint {

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  point_bn: string;

  @ApiProperty({
    example: 'The point of details of the package',
    description: 'The point of details of the package',
  })
  point_en: string;

  @ApiProperty({ example: 3, description: 'The package duration' })
  tik: number;
}
@Schema({
  timestamps: true,
})
export class Package {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the package',
  })
  _id: string;

  @ApiProperty({
    example: 'ওয়েট লস পাকেজ',
    description: 'The title of the package',
  })
  @Prop()
  title_bn: string;

  @ApiProperty({
    example: 'weight loss package',
    description: 'The title of the package',
  })
  @Prop()
  title_en: string;

  @ApiProperty({
    example: 'description in english',
    description: 'The description of the package',
  })
  @Prop()
  description_en: string;

  @ApiProperty({
    example: 'description in bangla',
    description: 'The description of the package',
  })
  @Prop()
  description_bn: string;

  @ApiProperty({
    type: [PriceAndDuration],
    description: 'The price and duration list of object of the package',
  })
  @Prop([PriceAndDuration])
  priceAndDuration: PriceAndDuration[];

  @ApiProperty({
    example: [DetailsPoint],
    description: 'The details list of object of the package',
  })
  @Prop([DetailsPoint])
  details: DetailsPoint[];

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The image of the package',
  })
  @Prop()
  image: string;

  @ApiProperty({
    example:
      'https://getfit-image-file.s3.ap-southeast-1.amazonaws.com/1708753399851Layer%202.png',
    description: 'The icon of the package',
  })
  @Prop()
  icon: string;

  @ApiProperty({
    type: Plan,
    description: 'Passing Plan Ids',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  plan: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the package was created',
  })
  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);

// PackageSchema.pre('findOne', autoPopulate);
// PackageSchema.pre('find', autoPopulate);

// function autoPopulate(next) {
//   this.populate('plan');
//   next();
// }
