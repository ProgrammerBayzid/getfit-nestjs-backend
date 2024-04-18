import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: [true, 'doctor ID is required'] })
  userId: string;

  @ApiProperty()
  @Prop({ required: [true, 'user role is required'] })
  role: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.String, default: null })
  refreshToken: string | null;

  @Prop({ type: SchemaTypes.String, default: null })
  resetPasswordCode: string | null;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
