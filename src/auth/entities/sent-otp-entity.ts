import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: [true, 'mobile number'] })
  mobile: string;

  @ApiProperty()
  @Prop({ required: [true, 'otp'] })
  otp: string;

  @ApiProperty()
  @Prop({ type: Date, expires: 120, default: Date.now }) // TTL index set to 1 minute (60 seconds)
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
