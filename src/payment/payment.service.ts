import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './entities/payment.entity';
import * as mongoose from 'mongoose';
import {
  Appoinment,
  PackageExpiredStatus,
} from 'src/appoinment/entities/appoinment.entity';
import { PaymentQuery } from './paymentQuery/paymentQuery';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: mongoose.Model<Payment>,
    @InjectModel(Appoinment.name)
    private appoinmentModel: mongoose.Model<Appoinment>,
  ) {}

  async create(
    userId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const createdPayment = new this.paymentModel({
      ...createPaymentDto,
      userId,
    });
    const savePayment = await createdPayment.save();
    await this.updateAppointmentStatus(savePayment.appointmentId, 'paid');
    return savePayment;
  }
  async updateAppointmentStatus(
    id: string,
    newStatus: string,
  ): Promise<Appoinment> {
    return this.appoinmentModel
      .findByIdAndUpdate(id, { status: newStatus }, { new: true })
      .exec();
  }

  async findAll(): Promise<Payment[]> {
    const getPayment = await this.paymentModel
      .find()
      .sort({ createdAt: 'desc' });
    return getPayment;
  }

  async findById(id: string): Promise<Payment> {
    const getSinglePayment = await this.paymentModel.findById(id);
    if (!getSinglePayment) {
      throw new NotFoundException('getSinglePayment not found');
    }
    return getSinglePayment;
  }

  async updateById(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    return await this.paymentModel.findByIdAndUpdate(id, updatePaymentDto, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Payment> {
    try {
      const deletedPayment = await this.paymentModel.findByIdAndDelete(id);

      if (deletedPayment) {
        // Document found and deleted successfully
        return deletedPayment;
      } else {
        // Document with the given ID not found
        throw new NotFoundException('payment not found');
      }
    } catch (error) {
      // Handle other errors (e.g., database connection issues)

      throw new NotFoundException('Error deleting payment');
    }
  }

  async myPaymentHistory(
    userId: string,
    role: string,
    queryOptions?: PaymentQuery,
  ): Promise<Payment[]> {
    let query;

    if (role === 'patient') {
      query = this.paymentModel.find({ userId: userId });
    } else {
      query = this.paymentModel.find({ doctorId: userId });
    }

    if (queryOptions && queryOptions.sortBy && queryOptions.sortOrder) {
      const sortOptions = {};
      sortOptions[queryOptions.sortBy] =
        queryOptions.sortOrder === 'desc' ? -1 : 1;
      query = query.sort(sortOptions);
    }

    if (queryOptions && queryOptions.page && queryOptions.limit) {
      const { page, limit } = queryOptions;
      query = query.skip((page - 1) * limit).limit(limit);
    }

    const paymentHistory = await query.exec();
    return paymentHistory;
  }
}
