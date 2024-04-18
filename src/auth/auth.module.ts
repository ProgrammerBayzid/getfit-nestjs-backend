import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RtStrategy } from './strategies/refresh-token.strategy';
import { AtStrategy } from './strategies/access-token.strategy';
import { Auth, AuthSchema } from './entities/auth.entity';
import { DoctorModule } from 'src/doctor/doctor.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Otp, OtpSchema } from './entities/sent-otp-entity';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { Doctor, DoctorSchema } from 'src/doctor/entities/doctor.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '8739c4aaddb29d8b017c55c25249266effbe144a',
      global: true,
    }),
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Otp.name, schema: OtpSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
    DoctorModule,
    UserModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    {
      provide: 'MAILER', // Define the token
      useClass: EmailService, // Provide the mailer service which creates the nodemailer transporter
    },
  ],
})
export class AuthModule {}
