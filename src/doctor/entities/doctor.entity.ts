import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { IsBoolean, IsString } from 'class-validator';
import {
  DoctorBankAccount,
  createDefaultDoctorBankAccount,
} from './doctor-bank-account.entity';
import {
  createDefaultDoctorVisiteDays,
  doctorVisiteDays,
} from './doctorVisiteDays-entity';
import {
  createDefaultDoctorConsultationFee,
  doctorConsultationFee,
} from './doctor-consultation-fee-entity';
import {
  createDefaultDoctorRating,
  doctorRating,
} from './doctor-rating-entity';
export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      // Exclude verificationCode and verificationEmailSent from the serialized object
      delete ret.verificationCode;
      delete ret.verificationEmailSent;
      return ret;
    },
  },
})
export class Doctor {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the doctor',
  })
  _id: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'bayzid.png',
    description: 'The image of the doctor',
  })
  @IsString()
  image: string;

  @ApiProperty()
  @Prop({
    required: [true, 'User email address is required'],
    unique: true,
  })
  email: string;

  @Prop({ required: [true, 'User password is required'] })
  password: string;

  @Prop({ default: null })
  @ApiProperty({
    example: null,
    description: 'The full name in English of the doctor',
  })
  @IsString()
  name_en: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'রুবাইয়াত খান',
    description: 'The full name in Bangla of the doctor',
  })
  @IsString()
  name_bn: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'BSC, MSC',
    description: 'The degree in english of the doctor',
  })
  @IsString()
  degree_en: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'বিএসসি, এমএসসি',
    description: 'The degree in Bangla of the doctor',
  })
  @IsString()
  degree_bn: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'Food & Nutrition Science',
    description: 'The subject in English of the doctor',
  })
  @IsString()
  subject_en: string;

  @Prop({ default: null })
  @ApiProperty({
    example: 'ফুড এন্ড নিউট্রিশন সায়েন্স',
    description: 'The subject in Bangla of the doctor',
  })
  @IsString()
  subject_bn: string;

  @ApiProperty({
    example: 'patuakhali',
    description: 'The location of the doctor',
  })
  @Prop({ default: null })
  location: string;

  @ApiProperty({
    example: 'write about you',
    description: 'write about doctor',
  })
  @Prop({ default: null })
  doctorInfo: string;

  @Prop({
    type: [],
  })
  @ApiProperty({
    type: [],
    description: 'The Educational Qualifications of the doctor',
  })
  education: [];

  @Prop({ type: [] })
  @ApiProperty({
    type: [],
    description: 'The work Experience list of object of the doctor',
  })
  workExperience: [];

  @Prop({ type: [] })
  @ApiProperty({
    type: [],
    description: 'The Educational Certificate list of object of the doctor',
  })
  educationalCertificate: [];

  @Prop({ type: [] })
  @ApiProperty({
    type: [],
    description: 'The Identity Information list of image object of the doctor',
  })
  identity: [];

  @ApiProperty({
    description: 'Pass The Plan Id in speciality list',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }] })
  speciality: mongoose.Schema.Types.ObjectId[];

  @ApiProperty({
    type: doctorVisiteDays,
    description: 'The visit Patient Days of the doctor',
  })
  @Prop({ type: doctorVisiteDays, default: createDefaultDoctorVisiteDays })
  visitPatientDays: doctorVisiteDays;

  @Prop({
    type: doctorConsultationFee,
    default: createDefaultDoctorConsultationFee,
  })
  @ApiProperty({
    type: doctorConsultationFee,
    description: 'The consultation Fee of the doctor',
  })
  consultationFee: doctorConsultationFee;

  @Prop({
    type: DoctorBankAccount,
    default: createDefaultDoctorBankAccount,
  })
  @ApiProperty({
    type: DoctorBankAccount,
    description: 'The doctor bank account ',
  })
  bankAccount: DoctorBankAccount;

  @Prop({ type: doctorRating, default: createDefaultDoctorRating })
  @ApiProperty({
    type: doctorRating,
    description: 'The rating of the doctor',
  })
  ratingData: doctorRating;

  @Prop({ default: null })
  @ApiProperty({
    example: 'Male',
    description: 'The gender of the doctor',
  })
  @IsString()
  gender: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '2002',
    description: 'The Date of Birth of the doctor',
  })
  @IsString()
  dateOfBirth: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '846583936746589',
    description: 'The nid Or Passport number of the doctor',
  })
  @IsString()
  nidOrPassport: string;

  @Prop({ default: null })
  @ApiProperty({
    example: '01676485383',
    description: 'The number of the doctor',
  })
  @IsString()
  mobile: string;

  @Prop({ default: 0 })
  @ApiProperty({
    example: 24,
    description: 'The visit Patient Hours of the doctor',
  })
  @IsString()
  visitPatientHours: number;

  @Prop({ default: 0 })
  @ApiProperty({
    example: 67,
    description: 'The total Patient Seen of the doctor',
  })
  totalPatientSeen: number;



  @Prop({ default: 0 })
  @ApiProperty({
    example: 24000,
    description: 'The doctor total earn',
  })
  @IsString()
  totalEarn: number;

  @Prop({ default: false })
  @ApiProperty({
    example: true,
    description: 'The doctor online true or false',
  })
  online: boolean;

  @ApiProperty()
  @Prop({ type: SchemaTypes.Boolean, default: false })
  @IsBoolean()
  verified: boolean;


  @ApiProperty()
  @Prop({ type: SchemaTypes.Boolean, default: false })
  @IsBoolean()
  reject: boolean;

  @ApiHideProperty()
  @Prop({ type: SchemaTypes.String, default: null })
  verificationCode: string | null;

  @ApiHideProperty()
  @Prop({ type: SchemaTypes.Boolean, default: false })
  verificationEmailSent: boolean;

  @ApiProperty({
    example: 'DT2056',
    description: 'The Doctor unique ID',
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

export const DoctorSchema = SchemaFactory.createForClass(Doctor);

DoctorSchema.pre('findOne', autoPopulate);
DoctorSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('speciality');
  next();
}
