import { Module } from '@nestjs/common';
import { DoctorReviewService } from './doctor-review.service';
import { DoctorReviewController } from './doctor-review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorReviewSchema } from './entities/doctor-review.entity';
import { DoctorSchema } from 'src/doctor/entities/doctor.entity';
import { AppoinmentSchema } from 'src/appoinment/entities/appoinment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DoctorReview', schema: DoctorReviewSchema },
      { name: 'Doctor', schema: DoctorSchema },
      { name: 'Appoinment', schema: AppoinmentSchema },
    ]),
  ],
  controllers: [DoctorReviewController],
  providers: [DoctorReviewService],
})
export class DoctorReviewModule {}
