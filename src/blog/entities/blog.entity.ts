import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Schema({
  timestamps: true,
})

export class Blog {

  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the Blog',
  })
  _id: string;


  @ApiProperty({
    example: 'কিভাবে এক সপ্তাহে ৩ কেজি কমানো যায়!',
    description: 'The title of the blog',
  })
  @Prop()
  title: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  @Prop()
  authorName: string;




  @ApiProperty({
    example: '4 মাসের ওয়েট লস পাকেজ',
    description: 'The details of the Blog',
  })
  @Prop()
  details: string;

  @ApiProperty({
    example: 'Fitness',
    description: 'The category of the Blog',
  })
  @Prop()
  category: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The image3 first of the Blog',
  })
  @Prop()
  image: string;

  @ApiProperty({
    type: Plan,
    description: 'The Plan associated with the Blog',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
  plan: string;


  @ApiProperty({
    type: Doctor,
    description: 'The Doctor associated with the Blog',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: string;


  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the Blog was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the Blog was last updated',
  })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
BlogSchema.pre('findOne', autoPopulate);
BlogSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('doctorId').populate('plan');
  next();
}