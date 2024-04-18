import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PackageModule } from './package/package.module';
import { PlanModule } from './plan/plan.module';
import { AtGuard } from './common/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { DoctorReviewModule } from './doctor-review/doctor-review.module';
import { BlogModule } from './blog/blog.module';
import { FaqModule } from './faq/faq.module';
import { WebsocketGateway } from './socket/socket.gateway';
import { DoctorSchema } from './doctor/entities/doctor.entity';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AgoraModule } from './agora/agora.module';
import { AppoinmentModule } from './appoinment/appoinment.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { FeaturesPhotoModule } from './features-photo/features-photo.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    AuthModule,
    DoctorModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://bringin:sUVlNS6HBGRi11m4@cluster1.9ttnssw.mongodb.net/?retryWrites=true&w=majority',
    ),
    PackageModule,
    PlanModule,
    AppoinmentModule,
    DoctorReviewModule,
    BlogModule,
    FaqModule,
    PaymentModule,
    NotificationsModule,
    AgoraModule,
    ContactUsModule,
    FeaturesPhotoModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
    WebsocketGateway,
  ],
})
export class AppModule {}
