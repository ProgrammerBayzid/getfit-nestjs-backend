import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';

@Schema({
  timestamps: true,
})
export class ContactUs {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the ContactUs',
  })
  _id: string;

  @ApiProperty({
    example: '',
    description: 'The massage of the ContactUs',
  })
  @Prop()
  massage: string;

  @ApiProperty({
    type: Doctor,
    description: 'The Doctor associated with the Blog',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @ApiProperty({
    type: User,
    description: 'The User associated with the ContactUs',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the ContactUs was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the ContactUs was last updated',
  })
  updatedAt: Date;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
ContactUsSchema.pre('findOne', autoPopulate);
ContactUsSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('doctorId').populate('userId');
  next();
}
