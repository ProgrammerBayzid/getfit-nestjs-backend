import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './entities/doctor.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthSchema } from 'src/auth/entities/auth.entity';
import { DoctorReviewSchema } from 'src/doctor-review/entities/doctor-review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Doctor', schema: DoctorSchema },
      { name: 'Auth', schema: AuthSchema },
      { name: 'DoctorReview', schema: DoctorReviewSchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, JwtService],
  exports: [DoctorService],
})
export class DoctorModule {}
