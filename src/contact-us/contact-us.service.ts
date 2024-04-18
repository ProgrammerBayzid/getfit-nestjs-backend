import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ContactUs } from './entities/contact-us.entity';
import mongoose from 'mongoose';
import { ContactUsQuery } from './contactus-query/contactus-query';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private contactUsModel: mongoose.Model<ContactUs>,
  ) {}

  async create(
    userId: string,
    role: string,
    createContactUsDto: CreateContactUsDto,
  ): Promise<ContactUs> {
    if (role === 'doctor') {
      const createContactUs = new this.contactUsModel({
        ...createContactUsDto,
        doctorId: userId,
      });
      await createContactUs.save();
      return createContactUs;
    } else {
      const createContactUs = new this.contactUsModel({
        ...createContactUsDto,
        userId: userId,
      });
      await createContactUs.save();
      return createContactUs;
    }
  }

  async findAll(queryOptions?: ContactUsQuery): Promise<ContactUs[]> {
    try {
      let query = this.contactUsModel.find();

      if (queryOptions?.userId) {
        query = query.where('userId').equals(queryOptions.userId);
      }
      if (queryOptions?.doctorId) {
        query = query.where('doctorId').equals(queryOptions.doctorId);
      }

      // Pagination
      const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
      query = query.skip(startIndex).limit(queryOptions?.limit);
      // Sorting
      if (queryOptions?.sortBy && queryOptions?.sortOrder) {
        const sortDirection = queryOptions.sortOrder === 'desc' ? -1 : 1;
        query = query.sort({ [queryOptions.sortBy]: sortDirection });
      }

      const getContactUs = await query.exec();
      return getContactUs;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<ContactUs> {
    const getSingleContactUs = await this.contactUsModel.findById(id);
    if (!getSingleContactUs) {
      throw new NotFoundException('ContactUs not found');
    }
    return getSingleContactUs;
  }

  async updateById(
    id: string,
    updateContactUs: UpdateContactUsDto,
  ): Promise<ContactUs> {
    return await this.contactUsModel.findByIdAndUpdate(id, updateContactUs, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<ContactUs> {
    try {
      return await this.contactUsModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException('Error deleting Doctor');
    }
  }
}
