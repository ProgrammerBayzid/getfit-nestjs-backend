import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeaturesPhotoDto } from './dto/create-features-photo.dto';
import { UpdateFeaturesPhotoDto } from './dto/update-features-photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FeaturesPhoto } from './entities/features-photo.entity';
import mongoose from 'mongoose';

@Injectable()
export class FeaturesPhotoService {

  constructor(
    @InjectModel(FeaturesPhoto.name)
    private featuresPhotoModel: mongoose.Model<FeaturesPhoto>,
  ) {}

  
  async create(createFeaturesPhotoDto: CreateFeaturesPhotoDto): Promise<FeaturesPhoto> {
    const res = await this.featuresPhotoModel.create(createFeaturesPhotoDto);
    return res;
  }

  async findAll(): Promise<FeaturesPhoto[]> {
    const featuresPhoto = await this.featuresPhotoModel.find();
    console.log(featuresPhoto);

    return featuresPhoto;
  }

  async findById(id: string): Promise<FeaturesPhoto> {
    const featuresPhoto = await this.featuresPhotoModel.findById(id);
    if (!featuresPhoto) {
      throw new NotFoundException('FeaturesPhoto not found');
    }
    return featuresPhoto;
  }

  async updateById(id: string, plan: UpdateFeaturesPhotoDto): Promise<FeaturesPhoto> {
    return await this.featuresPhotoModel.findByIdAndUpdate(id, plan, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<FeaturesPhoto> {
    try {
      const deletedfeaturesPhotoModel = await this.featuresPhotoModel.findByIdAndDelete(id);

      if (deletedfeaturesPhotoModel) {
        return deletedfeaturesPhotoModel;
      } else {
        throw new NotFoundException('featuresPhotoModel not found');
      }
    } catch (error) {
      throw new NotFoundException('Error deleting book');
    }
  }
}
