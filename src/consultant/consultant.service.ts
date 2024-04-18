import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Consultant } from './entities/consultant.entity';

@Injectable()
export class ConsultantService {
  constructor(
    @InjectModel(Consultant.name)
    private consultantModel: mongoose.Model<Consultant>,
  ) {}

  async create(consultant: Consultant): Promise<Consultant> {
    const res = await this.consultantModel.create(consultant);
    return res;
  }
  async findAll(): Promise<Consultant[]> {
    const consultant = await this.consultantModel.find();
    return consultant;
  }
  async findById(id: string): Promise<Consultant> {
    const consultant = await this.consultantModel.findById(id);
    if (!consultant) {
      throw new NotFoundException('consultant not found');
    }
    return consultant;
  }
  async updateById(id: string, consultant: Consultant): Promise<Consultant> {
    return await this.consultantModel.findByIdAndUpdate(id, consultant, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Consultant> {
    try {
      const deletedConsultant =
        await this.consultantModel.findByIdAndDelete(id);

      if (deletedConsultant) {
        return deletedConsultant;
      } else {
        throw new NotFoundException('consultant not found');
      }
    } catch (error) {
      throw new NotFoundException('Error deleting consultant');
    }
  }
}
