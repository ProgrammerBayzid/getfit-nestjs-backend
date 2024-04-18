import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Faq } from './entities/faq.entity';
import { FaqQuery } from './faqQuery/faqQuery';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel(Faq.name)
    private faqModel: mongoose.Model<Faq>,
  ) {}

  async create(faq: Faq): Promise<Faq> {
    const res = await this.faqModel.create(faq);
    return res;
  }
  async findAll(queryOptions?: FaqQuery): Promise<Faq[]> {
    let query = this.faqModel.find();
    if (queryOptions?.category) {
      try {
        query = query.where('category').equals(queryOptions.category);
      } catch (error) {
        console.error('Error during query execution:', error);
      }
    }
    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);

    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      query = query.sort({
        [queryOptions.sortBy]: queryOptions.sortOrder === 'desc' ? -1 : 1,
      });
    }

    const faqs = await query.exec();
    console.log('Resulting faqs:', faqs);
    return faqs;
  }
  async findById(id: string): Promise<Faq> {
    const faq = await this.faqModel.findById(id);
    if (!faq) {
      throw new NotFoundException('faq not found');
    }
    return faq;
  }
  async updateById(id: string, faq: Faq): Promise<Faq> {
    return await this.faqModel.findByIdAndUpdate(id, faq, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Faq> {
    try {
      const deletedFaq = await this.faqModel.findByIdAndDelete(id);

      if (deletedFaq) {
        // Document found and deleted successfully
        return deletedFaq;
      } else {
        // Document with the given ID not found
        throw new NotFoundException('Book not found');
      }
    } catch (error) {
      // Handle other errors (e.g., database connection issues)

      throw new NotFoundException('Error deleting book');
    }
  }
}
