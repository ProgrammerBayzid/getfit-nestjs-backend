import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the user',
  })
  _id: string;

  @ApiProperty({
    example: 'bayzid',
    description: 'The name of the user',
  })
  @Prop({ default: null })
  name: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The image of the user',
  })
  @Prop({ default: null })
  image: string;

  @ApiProperty({
    example: '01676485383',
    description: 'The mobile number of the user',
  })
  @Prop({ default: null })
  mobile: string;

  @ApiProperty({
    example: 'bayzid@gmail.com',
    description: 'The email of the user',
  })
  @Prop({ default: null })
  email: string;

  @ApiProperty({
    example: 'Male',
    description: 'The gender of the user',
  })
  @Prop({ default: null })
  gender: string;

  @ApiProperty({
    example: 21,
    description: 'The age of the user',
  })
  @Prop({ default: null })
  ageInYear: number;

  @ApiProperty({
    example: 21,
    description: 'The age of the user',
  })
  @Prop({ default: null })
  ageInMonth: number;

  @ApiProperty({
    example: 5,
    description: 'The height In Feet of the user',
  })
  @Prop({ default: null })
  heightInFeet: number;

  @ApiProperty({
    example: 6,
    description: 'The height In Inch of the user',
  })
  @Prop({ default: null })
  heightInInch: number;

  @ApiProperty({
    example: 53,
    description: 'The weight In Kg of the user',
  })
  @Prop({ default: null })
  weightInKg: number;

  @ApiProperty({
    example: 53.5,
    description: 'The bmi result of the user',
  })
  @Prop({ default: null })
  bmi: number;

  @ApiProperty({
    example: 'A+',
    description: 'The blood Group of the user',
  })
  @Prop({ default: null })
  bloodGroup: string;

  @ApiProperty({
    example: 'Single',
    description: 'The marital Status of the user',
  })
  @Prop({ default: null })
  maritalStatus: string;

  @ApiProperty({
    example: 'PT2056',
    description: 'The Patient unique ID',
  })
  @Prop()
  uniqueId: string;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the doctor was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the doctor was last updated',
  })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
