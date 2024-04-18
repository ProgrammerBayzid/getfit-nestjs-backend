import { Package } from 'src/package/entities/package.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';

@Schema({
  timestamps: true,
})
export class Payment {
  @ApiProperty({
    example: '5ff48e093ecb8200f8b0fff3',
    description: 'The unique identifier of the payment',
  })
  _id: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '',
    description: 'type can be onetime or package',
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
    example: '',
    description: 'Patient visiting Reason',
  })
  visitingReason: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '',
    description: 'Patient Payment transaction Id',
  })
  trxId: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '',
    description: 'Patient Payment receipt Number',
  })
  receiptNum: string;

  @ApiProperty({
    type: User,
    description: 'The User id use information',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty({
    type: Doctor,
    description: 'The User id use information',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  doctorId: Doctor;

  @ApiProperty({
    type: Package,
    description: 'The selected package id use information',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Package' })
  packageId: string;

  @ApiProperty({
    type: Appoinment,
    description: 'The selected package id use information',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Appoinment' })
  appointmentId: string;

  @Prop()
  @ApiProperty({
    example: '1',
    description: '',
  })
  expiredDuration: string;

  @ApiProperty({
    example: '7530',
    description: 'The total of the payment',
  })
  @Prop()
  total: string;

  @ApiProperty({
    example: '562785',
    description: 'The promoCode of the payment',
  })
  @Prop()
  promoCode: string;

  @ApiProperty({
    example: 'bkash',
    description: 'The paymentMethod of the payment',
  })
  @Prop()
  paymentMethod: string;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the payment was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-02-01T12:34:56.789Z',
    description: 'The timestamp when the payment was last updated',
  })
  updatedAt: Date;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
PaymentSchema.pre('findOne', autoPopulate);
PaymentSchema.pre('find', autoPopulate);

function autoPopulate(next) {
  this.populate('userId')
    .populate([
      {
        path: 'packageId',
        populate: { path: 'plan' },
      },
    ])
    .populate('doctorId')
    .populate('appointmentId');
  next();
}
