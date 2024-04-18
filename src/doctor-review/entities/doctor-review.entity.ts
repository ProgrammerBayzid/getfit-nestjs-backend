import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import * as mongoose from 'mongoose';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';

export type DoctorReviewDocument = HydratedDocument<DoctorReview>;
@Schema({
  timestamps: true,
})
export class DoctorReview {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the Doctor Review',
  })
  _id: string;

  @ApiProperty({
    type: [User],
    description: 'The USER associated with the Doctor Review',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty({
    type: Doctor,
    description: 'The Doctor associated with the Doctor Review',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @ApiProperty({
    type: Appoinment,
    description: 'The Appoinment associated with the Doctor Review',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appoinment' })
  appoinmentId: string;

  @ApiProperty({
    example: 4.5,
    description: 'The rating of the doctor',
  })
  @Prop()
  rating: number;



  @ApiProperty({
    example: '',
    description: 'The review of the doctor',
  })
  @Prop()
  review: string;


  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the Doctor Review was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the Doctor Review was last updated',
  })
  updatedAt: Date;
}

export const DoctorReviewSchema = SchemaFactory.createForClass(DoctorReview);



DoctorReviewSchema.pre('findOne', autoPopulate);
DoctorReviewSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('doctorId').populate('userId');
  next();
}