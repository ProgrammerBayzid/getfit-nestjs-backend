import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Doctor, DoctorDocument } from './entities/doctor.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { DoctorQuery } from './doctorQuery/doctorQuery';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { Auth, AuthDocument } from 'src/auth/entities/auth.entity';
import {
  DoctorReview,
  DoctorReviewDocument,
} from 'src/doctor-review/entities/doctor-review.entity';
import { DoctorReviewQuery } from 'src/doctor-review/doctorReviewQuery/doctorReviewQuery';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdateVerifyDto } from './dto/update-verify-dto';
import { UpdateRejectDto } from './dto/update-reject-dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name)
    private readonly doctorModel: mongoose.Model<DoctorDocument>,

    @InjectModel(Auth.name)
    private authModel: mongoose.Model<AuthDocument>,
    @InjectModel(DoctorReview.name)
    private doctorReviewModel: mongoose.Model<DoctorReviewDocument>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async doctorCreate(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({
      email: createDoctorDto.email,
    });
    if (doctor) {
      throw new ForbiddenException('doctor already exists');
    }

    const createdDoctor = await this.doctorModel.create(createDoctorDto);

    createdDoctor.password = await this.hashPassword(createdDoctor.password);

    await createdDoctor.save();

    return this.sanitizeDoctor(createdDoctor);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async findAll(queryOptions?: DoctorQuery): Promise<Doctor[]> {
    let query = this.doctorModel.find({
      verified: true,
    });

    if (queryOptions.verified !== undefined) {
      query = query.where('verified').equals(queryOptions.verified);
    }
    if (queryOptions.reject !== undefined) {
      query = query.where('reject').equals(queryOptions.reject);
    }
    if (queryOptions.online !== undefined) {
      query = query.where('online').equals(queryOptions.online);
    }
    if (queryOptions.gender) {
      query = query.where('gender').equals(queryOptions.gender);
    }
    if (queryOptions.averageRating) {
      const averageRating = +queryOptions.averageRating;
      query = query.where('ratingData.averageRating').equals(averageRating);
    }
    if (queryOptions.speciality) {
      query = query.where('speciality').equals(queryOptions.speciality);
    }
    if (queryOptions.totalRating) {
      const totalRating = +queryOptions.totalRating;
      query = query.where('ratingData.totalRating').equals(totalRating);
    }
    const startIndex = (queryOptions?.page - 1) * queryOptions?.limit;
    query = query.skip(startIndex).limit(queryOptions?.limit);
    const sortOptions: any = {};
    if (queryOptions?.sortBy && queryOptions?.sortOrder) {
      query = query.sort({
        [queryOptions.sortBy]: queryOptions.sortOrder === 'desc' ? -1 : 1,
      });
    }
    if (Object.keys(sortOptions).length > 0) {
      query = query.sort(sortOptions);
    }
    const getDoctor = await query.exec();
    return getDoctor;
  }

  async findMyProfile(id: string): Promise<Doctor> {
    const users = await this.doctorModel.findById(id);
    return users;
  }

  async findById(id: string): Promise<Doctor> {
    const getSingleDoctor = await this.doctorModel.findById(id);
    if (!getSingleDoctor) {
      throw new NotFoundException('getSingleDoctor not found');
    }
    return getSingleDoctor;
  }
  async updateById(
    doctorID: string,
    updateDoctor: UpdateDoctorDto,
  ): Promise<Doctor> {
    return await this.doctorModel
      .findByIdAndUpdate(doctorID, updateDoctor, {
        new: true,
        runValidators: true,
      })
      .populate({ path: 'speciality' });
  }

  async deleteById(id: string): Promise<Doctor> {
    try {
      const deletedDoctor = await this.doctorModel.findByIdAndDelete(id);

      if (deletedDoctor) {
        await this.authModel.deleteMany({ userId: id });
        return deletedDoctor;
      } else {
        // Document with the given ID not found
        throw new NotFoundException('Doctor not found');
      }
    } catch (error) {
      // Handle other errors (e.g., database connection issues)

      throw new NotFoundException('Error deleting Doctor');
    }
  }

  async updateVerificationEmailSentStatus(
    id: string,
    status: boolean,
  ): Promise<Doctor> {
    const doctor = await this.doctorModel.findById(id);

    doctor.verificationEmailSent = status;
    await doctor.save();

    return this.sanitizeDoctor(doctor);
  }

  private sanitizeDoctor(doctor: DoctorDocument): Doctor {
    if (!doctor) {
      throw new ForbiddenException('doctor not found');
    }

    const sanitized = doctor.toObject();
    delete sanitized.password;
    delete sanitized.verificationEmailSent;
    delete sanitized.verificationCode;

    return sanitized;
  }
  async findOneByEmailForEmailOrPasswordChange(email: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({ email });
    return doctor;
  }

  async findOneByEmail(email: string): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({ email });
    return this.sanitizeDoctor(doctor);
  }

  async findDoctorWithPasswordByEmail(email: string): Promise<Doctor> {
    const doctor = this.doctorModel.findOne({ email });
    return doctor;
  }

  async myReview(
    doctorId: string,
    queryOptions?: DoctorReviewQuery,
  ): Promise<DoctorReview[]> {
    let query = this.doctorReviewModel.find({ doctorId: doctorId });

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

    const reviews = await query.exec();
    return reviews;
  }

  async updatePassword(id: string, password: string): Promise<Doctor> {
    const user = await this.doctorModel.findById(id);

    // hash password
    const hashedPassword = await this.hashPassword(password);

    user.password = hashedPassword;
    await user.save();

    return this.sanitizeDoctor(user);
  }

  async verifyDoctorById(
    id: string,
    updateVerifyDto: UpdateVerifyDto,
  ): Promise<Doctor> {
    return await this.doctorModel.findByIdAndUpdate(id, updateVerifyDto, {
      new: true,
      runValidators: true,
    });
  }

  async rejectDoctorById(
    id: string,
    updateRejectDto: UpdateRejectDto,
  ): Promise<Doctor> {
    return await this.doctorModel.findByIdAndUpdate(id, UpdateRejectDto, {
      new: true,
      runValidators: true,
    });
  }




  
}
