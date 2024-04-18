import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
export type PatientNotificationDocument = HydratedDocument<PatientNotification>;

export enum PatientNotificationEnum {
  appointment = 'appointment',
  packageDetails = 'package',
  followup = 'followup',
  onetime = 'onetime',
  advice = 'advice',
}

export class RouteName {}
@Schema({
  timestamps: true,
})
export class PatientNotification {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the notification',
  })
  _id: string;

  @Prop()
  @ApiProperty({
    example: 'bayzid wating for appoinment',
    description: 'The notification Title',
  })
  title: string;

  @Prop()
  @ApiProperty({
    example: 'bayzid wating for appoinment',
    description: 'The notification body',
  })
  notificationBody: string;

  @Prop()
  @ApiProperty({
    example: 'data',
    description: 'The notification data',
  })
  data: string;

  @ApiProperty({
    example: 'onetime',
    description: 'The notification data',
    enum: PatientNotificationEnum,
  })
  @Prop({ default: PatientNotificationEnum.onetime })
  type: PatientNotificationEnum;

  @ApiProperty({
    type: User,
    description: 'The User id use information',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty({
    type: Doctor,
    description: 'The doctor id ',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the appointment was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the Appoinment was last updated',
  })
  updatedAt: Date;
}
export const PatientNotificationSchema =
  SchemaFactory.createForClass(PatientNotification);

PatientNotificationSchema.pre('findOne', autoPopulate);
PatientNotificationSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('userId').populate('doctorId');
  next();
}