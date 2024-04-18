import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorReviewDto } from './dto/create-doctor-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  DoctorReview,
  DoctorReviewDocument,
} from './entities/doctor-review.entity';
import * as mongoose from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { DoctorReviewQuery } from './doctorReviewQuery/doctorReviewQuery';
import { UpdateDoctorReviewDto } from './dto/update-doctor-review.dto';
import { Appoinment } from 'src/appoinment/entities/appoinment.entity';

@Injectable()
export class DoctorReviewService {
  constructor(
    @InjectModel(DoctorReview.name)
    private doctorReviewModel: mongoose.Model<DoctorReview>,
    @InjectModel(Doctor.name)
    private doctorModel: mongoose.Model<Doctor>,
    @InjectModel(Appoinment.name)
    private appoinmentModel: mongoose.Model<Appoinment>,
  ) {}

  async create(
    userId: string,
    createDoctorReviewDto: CreateDoctorReviewDto,
  ): Promise<DoctorReview> {
    const doctor = await this.doctorModel.findOne({
      _id: createDoctorReviewDto.doctorId,
    });

    const appoinmentReview = await this.appoinmentModel.findOne({
      _id: createDoctorReviewDto.appoinmentId,
    });

    if (appoinmentReview) {
      await this.appoinmentModel.findByIdAndUpdate(
        createDoctorReviewDto.appoinmentId,
        {
          $set: {
            reviewGiven: true,
          },
        },
        { new: true },
      );
    }

    const doctorReview = new this.doctorReviewModel({
      ...createDoctorReviewDto,
      userId: userId,
    });
    await doctorReview.save();

    if (doctor) {
      const newTRatings =
        doctor.ratingData.rating + createDoctorReviewDto.rating;
      const newTotalRating = doctor.ratingData.totalRating + 1;
      const newAverageRating = newTRatings / newTotalRating;
      const roundedNumberAverageRating = Math.round(newAverageRating);


      await this.doctorModel.findByIdAndUpdate(
        createDoctorReviewDto.doctorId,
        {
          $set: {
            'ratingData.rating': newTRatings,
            'ratingData.totalRating': newTotalRating,
            'ratingData.averageRating': roundedNumberAverageRating,
          },
        },
        { new: true },
      );
    }

    return doctorReview;
  }

  async findAll(queryOptions?: DoctorReviewQuery): Promise<DoctorReview[]> {
    let query = this.doctorReviewModel.find();

    if (queryOptions?.doctorId) {
      query = query.where('doctorId').equals(queryOptions.doctorId);
    }
    if (queryOptions.userId) {
      query = query.where('userId').equals(queryOptions.userId);
    }

    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);

    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      query = query.sort({
        [queryOptions.sortBy]: queryOptions.sortOrder === 'desc' ? -1 : 1,
      });
    }

    const review = await query.exec();
    return review;
  }

  async findById(id: string): Promise<DoctorReview> {
    const getSinglereview = await this.doctorReviewModel.findById(id);
    if (!getSinglereview) {
      throw new NotFoundException('review not found');
    }
    return getSinglereview;
  }
  async updateById(
    id: string,
    updateReview: UpdateDoctorReviewDto,
  ): Promise<DoctorReview> {
    const getSingleReview = await this.doctorReviewModel.findById(id);
    const doctor = await this.doctorModel.findOne({
      _id: getSingleReview.doctorId,
    });

    if (doctor) {
      const newRating =
        doctor.ratingData.rating - getSingleReview.rating + updateReview.rating;
      const newAverageRating = newRating / doctor.ratingData.totalRating;

      await this.doctorModel.findByIdAndUpdate(
        doctor._id,
        {
          $set: {
            'ratingData.rating': newRating,
            'ratingData.averageRating': newAverageRating,
          },
        },
        { new: true },
      );
    }
    return await this.doctorReviewModel.findByIdAndUpdate(id, updateReview, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<DoctorReview> {
    try {
      const getSingleReview = await this.doctorReviewModel.findById(id);
      const doctor = await this.doctorModel.findOne({
        _id: getSingleReview.doctorId,
      });

      if (doctor) {
        const newTRatings = doctor.ratingData.rating - getSingleReview.rating;
        const newtotalRating = doctor.ratingData.totalRating - 1;
        const newAverageRating = newTRatings / newtotalRating;

        await this.doctorModel.findByIdAndUpdate(
          doctor._id,
          {
            $set: {
              'ratingData.rating': newTRatings,
              'ratingData.totalRating': newtotalRating,
              'ratingData.averageRating': newAverageRating,
            },
          },
          { new: true },
        );
      }

      const deletedReview = await this.doctorReviewModel.findByIdAndDelete(id);

      if (deletedReview) {
        return deletedReview;
      } else {
        throw new NotFoundException('Book not found');
      }
    } catch (error) {
      throw new NotFoundException('Error deleting book');
    }
  }
}
