import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { User } from 'src/user/entities/user.entity';
import { Package } from 'src/package/entities/package.entity';

export type AppoinmentDocument = HydratedDocument<Appoinment>;

export enum PackageExpiredStatus {
  EXPIRED = 'expired',
  ACTIVE = 'active',
}

class DoctorAdviceEntity {
  @ApiProperty({ example: '', description: 'The details of the FollowUp' })
  details: string;

  @ApiProperty({ example: '', description: 'The price of the FollowUp' })
  followUpDate: string;

  @ApiProperty({
    example: ['image.png'],
    description: 'The Add Diet/Advice Chart image',
    type: [String],
  })
  image: string[];

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The doctor advice date',
  })
  adviceDate: string;
}

@Schema({ timestamps: true })
export class Appoinment {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the Appoinment',
  })
  _id: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'package or onetime',
    description: 'The type can be onetime or package',
  })
  type: string;

  @Prop({ required: false })
  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title english',
  })
  packageTitle_en: string;

  @Prop({ required: false })
  @ApiProperty({
    example: '2 month weight loss package',
    description: 'The buy package title bangla',
  })
  packageTitle_bn: string;

  @Prop({ required: false })
  @ApiProperty({
    example: 5000,
    description: 'The buy package price',
  })
  packagePrice: number;

  @ApiProperty({
    type: Package,
    description: 'The preferred package ID',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package' })
  packageId: string;

  @Prop({ default: PackageExpiredStatus.ACTIVE })
  packageExpired: string;

  @Prop()
  @ApiProperty({
    example: 1,
    description: 'Expiry date of the package',
  })
  expiredDuration: number;

  @ApiProperty({
    type: Doctor,
    description:
      'The ID of the doctor under whom you want to make an appointment',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: string;

  @ApiProperty({
    example: '332056',
    description: 'The Appoinment unique ID',
  })
  @Prop()
  appointmentId: string;

  @ApiProperty({
    example: false,
    description: 'The Appoinment review true or false',
  })
  @Prop({ default: false })
  reviewGiven: boolean;

  @ApiProperty({
    type: User,
    description: 'The user ID',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @ApiProperty({
    example: 'শনি',
    description: 'The Booked visit Days of Patient.',
  })
  @Prop()
  visitPatientDays: string;

  @ApiProperty({
    example: 'visiting reason',
    description: 'The visiting reason of Patient.',
  })
  @Prop()
  visitingReason: string;

  @ApiProperty({
    example: 'problem Details',
    description: 'The problem Details of Patient.',
  })
  @Prop()
  problemDetails: string;

  @Prop({
    type: [],
  })
  @ApiProperty({
    type: [],
    description: 'The image of patient',
  })
  image: [];

  @Prop()
  @ApiProperty({
    example: '11:55 AM',
    description: 'The Booked visit Hour of Patient.',
  })
  visitPatientHours: string;

  @Prop({ default: 'Unpaid' })
  @ApiProperty({
    example: 'Unpaid',
    description: 'The appointment status of Patient.',
  })
  status: string;

  @ApiProperty({
    type: [DoctorAdviceEntity],
    description: 'The FollowUp list of the appoinment',
  })
  @Prop([DoctorAdviceEntity])
  doctorAdvice: DoctorAdviceEntity[];

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

export const AppoinmentSchema = SchemaFactory.createForClass(Appoinment);

AppoinmentSchema.pre('findOne', autoPopulate);
AppoinmentSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('doctorId').populate('userId').populate('packageId');
  next();
}
