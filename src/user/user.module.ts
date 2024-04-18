import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthSchema } from 'src/auth/entities/auth.entity';
import { DoctorReviewSchema } from 'src/doctor-review/entities/doctor-review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Auth', schema: AuthSchema },
      { name: 'DoctorReview', schema: DoctorReviewSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService],
})
export class UserModule {}
