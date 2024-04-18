import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from './entities/plan.entity';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name)
    private planModel: mongoose.Model<Plan>,
  ) {}

  async create(plane: CreatePlanDto): Promise<Plan> {
    const res = await this.planModel.create(plane);
    return res;
  }
  async findAll(): Promise<Plan[]> {
    const plan = await this.planModel.find();
    console.log(plan);

    return plan;
  }
  async findById(id: string): Promise<Plan> {
    const plan = await this.planModel.findById(id);
    if (!plan) {
      throw new NotFoundException('plan not found');
    }
    return plan;
  }
  async updateById(id: string, plan: UpdatePlanDto): Promise<Plan> {
    return await this.planModel.findByIdAndUpdate(id, plan, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Plan> {
    try {
      const deletedPlan = await this.planModel.findByIdAndDelete(id);

      if (deletedPlan) {
        // Document found and deleted successfully
        return deletedPlan;
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
