import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, AuthDocument } from 'src/auth/entities/auth.entity';
import {
  DoctorReview,
  DoctorReviewDocument,
} from 'src/doctor-review/entities/doctor-review.entity';
import { DoctorReviewQuery } from 'src/doctor-review/doctorReviewQuery/doctorReviewQuery';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<AuthDocument>,
    @InjectModel(DoctorReview.name)
    private doctorReviewModel: mongoose.Model<DoctorReviewDocument>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      mobile: createUserDto.mobile,
    });
    if (user) {
      throw new ForbiddenException('patient already exists');
    }

    const createUser = new this.userModel(createUserDto);

    await createUser.save();

    return this.sanitizeUser(createUser);
  }

  async findByNumber(mobile: string): Promise<User> {
    const userFindByNumber = this.userModel.findOne({ mobile });
    return userFindByNumber;
  }

  async findAll(): Promise<{
    allUsers: User[];
    maleUsers: User[];
    femaleUsers: User[];
  }> {
    const allUsers = await this.userModel.find().sort({ createdAt: 'desc' });
    const maleUsers = await this.userModel
      .find({ gender: 'Male' })
      .sort({ createdAt: 'desc' });
    const femaleUsers = await this.userModel
      .find({ gender: 'Female' })
      .sort({ createdAt: 'desc' });

    return { allUsers, maleUsers, femaleUsers };
  }

  async findMyProfile(id: string): Promise<User> {
    const users = await this.userModel.findById(id);
    return users;
  }

  async findById(id: string): Promise<User> {
    const singleUser = await this.userModel.findById(id);
    if (!singleUser) {
      throw new NotFoundException('user not found');
    }
    return singleUser;
  }
  async updateById(id: string, user: UpdateUserDto): Promise<User> {
    const { weightInKg, heightInFeet, heightInInch } = user;

    let updatedUser = { ...user };

    if (weightInKg && heightInFeet && heightInInch) {
      const heightInCm = heightInFeet * 30.48 + heightInInch * 2.54;
      const bmi = weightInKg / ((heightInCm / 100) * (heightInCm / 100));

      updatedUser = { ...user, bmi };
    }

    return await this.userModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);

      if (deletedUser) {
        await this.authModel.deleteMany({ userId: id });
        return deletedUser;
      } else {
        // Document with the given ID not found
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      // Handle other errors (e.g., database connection issues)

      throw new NotFoundException('Error deleting book');
    }
  }

  private sanitizeUser(user: UserDocument): User {
    if (!user) {
      throw new ForbiddenException('user not found');
    }

    const sanitized = user.toObject();

    return sanitized;
  }
  async findUserWithByMobile(mobile: string): Promise<User> {
    const user = this.userModel.findOne({ mobile });
    return user;
  }

  async myAddedReview(
    userId: string,
    queryOptions?: DoctorReviewQuery,
  ): Promise<DoctorReview[]> {
    let query = this.doctorReviewModel.find({ userId: userId });

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
}
