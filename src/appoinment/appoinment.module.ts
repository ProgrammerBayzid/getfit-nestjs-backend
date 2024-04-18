import { Module } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { AppoinmentController } from './appoinment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppoinmentSchema } from './entities/appoinment.entity';
import { PackageSchema } from 'src/package/entities/package.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationSchema } from 'src/notifications/entities/notification.entity';
import { UserModule } from 'src/user/user.module';
import { PlanModule } from 'src/plan/plan.module';
import { PackageModule } from 'src/package/package.module';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientNotificationSchema } from 'src/notifications/entities/patient-notification.entity';
import { DoctorSchema } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Appoinment', schema: AppoinmentSchema },
      { name: 'Package', schema: PackageSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'PatientNotification', schema: PatientNotificationSchema },
      { name: 'Doctor', schema: DoctorSchema },
    ]),
    NotificationsModule,
    UserModule,
    PlanModule,
    PackageModule,
    DoctorModule,
  ],
  controllers: [AppoinmentController],
  providers: [AppoinmentService, NotificationsService],
})
export class AppoinmentModule {}
