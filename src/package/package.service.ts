import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Package } from './entities/package.entity';
import * as mongoose from 'mongoose';

import { Plan } from 'src/plan/entities/plan.entity';
import { PackageQuery } from './types/packageQuery.types';
import { CreatePackageDto } from './dto/create-package.dto';
@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name)
    private packageModel: mongoose.Model<Package>,
    @InjectModel(Plan.name)
    private planModel: mongoose.Model<Plan>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const createdPackage = new this.packageModel(createPackageDto);
    const savedPackage = await createdPackage.save(); // Save the newly created package

    await this.planModel.findByIdAndUpdate(createPackageDto.plan, {
      packages: savedPackage._id,
    });

    return savedPackage;
  }

  async findAll(queryOptions?: PackageQuery): Promise<Package[]> {
    let query = this.packageModel.find();

    if (queryOptions.duration) {
      const duration = +queryOptions.duration;
      query = query.where('priceAndDuration.duration_en').equals(duration);
  }
  if (queryOptions.planId) {
      query = query.where('plan').equals(queryOptions.planId);
  }
    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);

    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      const sortOrder = queryOptions.sortOrder === 'desc' ? -1 : 1;
      query = query.sort({
        [queryOptions.sortBy]: sortOrder,
      });
    }

    const packages = await query.exec();
    return packages;
  }

  async findById(id: string): Promise<Package> {
    const getSinglePackage = await this.packageModel.findById(id);
    if (!getSinglePackage) {
      throw new NotFoundException('getSinglePackage not found');
    }
    return getSinglePackage;
  }
  async updateById(id: string, updatePackage: Package): Promise<Package> {
    return await this.packageModel.findByIdAndUpdate(id, updatePackage, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Package> {
    try {
      const deletedPackage = await this.packageModel.findByIdAndDelete(id);

      if (deletedPackage) {
        return deletedPackage;
      } else {
        throw new NotFoundException('Book not found');
      }
    } catch (error) {
      throw new NotFoundException('Error deleting book');
    }
  }






  
  
}
