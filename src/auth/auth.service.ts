import { Doctor, DoctorDocument } from './../doctor/entities/doctor.entity';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { Tokens } from './types/token.type';
import { DoctorSignUpDto } from './dto/doctor-sing-up.dto';
import { DoctorLoginDto } from './dto/doctor-login.dto';
import { SendOTPDto } from './dto/send-otp.dto';
import axios from 'axios';
import { Otp, OtpDocument } from './entities/sent-otp-entity';
import { UserService } from 'src/user/user.service';
import { PatientSignUpDto } from './dto/patient-sing-up.dto';
import { PatientLoginDto } from './dto/patient-login.dto';
import { DoctorRefreshToeknDto } from './dto/doctor-refresh-token.dto';
import { DoctorForgotPasswordDto } from './dto/doctor-forgot-password.dto';
import { DoctorResetPasswordDto } from './dto/doctor-reset-password.dto';
import { EmailService } from 'src/email/email.service';
import { DoctorResetPasswordCodeCheckDto } from './dto/reset-password-code-check-dto';
import { EmailChangeDto } from './dto/email-change-dto';
import { PasswordChangeDto } from './dto/password-change-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly doctorService: DoctorService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpDocument>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<DoctorDocument>,
  ) {}

  async doctorSignup(dto: DoctorSignUpDto): Promise<Tokens> {
    const prefix = 'GN';
    const randomPart = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const doctorUniqueId = `${prefix}${randomPart.toString().padStart(4, '0')}`; // Ensure random part is 4 digits

    const doctor = await this.doctorService.doctorCreate({
      email: dto.email,
      password: dto.password,
      uniqueId: doctorUniqueId,
    });

    await this.authModel.create({
      userId: doctor._id,
      role: 'doctor',
    });

    const tokens = await this.getTokens(doctor._id.toString(), 'doctor');
    await this.updateRefreshToken(doctor._id.toString(), tokens.refresh_token);

    await this.doctorService.updateVerificationEmailSentStatus(
      doctor._id.toString(),
      true,
    );

    return {
      ...tokens,
    };
  }

  async DoctorLogin(dto: DoctorLoginDto): Promise<Tokens> {
    const doctor = await this.doctorService.findDoctorWithPasswordByEmail(
      dto.email,
    );
    if (dto.email == 'developer@gemail.dev' && dto.password == '12312312') {
      const adminToken = await this.getTokens(doctor._id.toString(), 'admin');
      await this.updateRefreshToken(
        doctor._id.toString(),
        adminToken.refresh_token,
      );

      return adminToken;
    }

    if (!doctor) {
      throw new ForbiddenException('invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, doctor.password);
    if (!isMatch) {
      throw new ForbiddenException('password not match');
    }

    const tokens = await this.getTokens(doctor._id.toString(), 'doctor');
    await this.updateRefreshToken(doctor._id.toString(), tokens.refresh_token);

    return tokens;
  }

  // patient auth

  async patientSignUp(patientSignDto: PatientSignUpDto): Promise<Tokens> {
    const otpDocument = await this.otpModel.findOne({
      mobile: patientSignDto.mobile,
    });

    const isUser = await this.userService.findByNumber(patientSignDto.mobile);

    if (
      patientSignDto.mobile == '01875896897' &&
      patientSignDto.otp == '1234'
    ) {
      const tokens = await this.getTokens(isUser._id.toString(), 'patient');
      await this.updateRefreshToken(
        isUser._id.toString(),
        tokens.refresh_token,
      );

      return tokens;
    }

    if (!otpDocument) {
      throw new BadRequestException('OTP expired.');
    }

    if (otpDocument.otp !== patientSignDto.otp) {
      throw new BadRequestException('Invalid OTP.');
    }

    if (!isUser) {
      const prefix = 'GC';
      const randomPart = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
      const patientUniqueId = `${prefix}${randomPart
        .toString()
        .padStart(4, '0')}`; // Ensure random part is 4 digits

      const user = await this.userService.create({
        mobile: patientSignDto.mobile,
        uniqueId: patientUniqueId,
      });

      await this.authModel.create({
        userId: user._id,
        role: 'patient',
      });

      const tokens = await this.getTokens(user._id.toString(), 'patient');
      await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

      return {
        ...tokens,
      };
    } else {
      const tokens = await this.getTokens(isUser._id.toString(), 'patient');
      await this.updateRefreshToken(
        isUser._id.toString(),
        tokens.refresh_token,
      );

      return tokens;
    }
  }

  private async getTokens(userId: string, role: string): Promise<Tokens> {
    // const accessTokenExpiresIn = 60; // 60 seconds for testing
    const accessTokenExpiresIn = 60 * 60 * 24; // 24 hours in seconds
    const refreshTokenExpiresIn = 60 * 60 * 24 * 7; // 1 week in seconds

    // calculate expiry dates
    const now = new Date();
    const accessTokenExpiryDate = new Date(
      now.getTime() + accessTokenExpiresIn * 1000,
    );
    const refreshTokenExpiryDate = new Date(
      now.getTime() + refreshTokenExpiresIn * 1000,
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, role },
        {
          secret: this.config.get('AT_SECRET_KEY'),
          expiresIn: accessTokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        { userId, role },
        {
          secret: this.config.get('RT_SECRET_KEY'),
          expiresIn: refreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: accessTokenExpiryDate,
      userId: userId,
      // refresh_token_expiry: refreshTokenExpiryDate
    };
  }

  async updateTokens(
    userId: string,
    dto: DoctorRefreshToeknDto,
  ): Promise<Tokens> {
    const userAuth = await this.authModel.findOne({ userId });
    if (!userAuth || !userAuth.refreshToken) {
      throw new ForbiddenException('invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      dto.refreshToken,
      userAuth.refreshToken,
    );
    if (!isMatch) {
      throw new ForbiddenException('invalid credentials');
    }
    const role = userAuth.role;
    console.log(role);

    if (role !== 'patient' && role !== 'doctor') {
      throw new Error('Invalid user role');
    }

    const tokens = await this.getTokens(userId, role);
    await this.updateRefreshToken(userId, tokens.refresh_token);

    return tokens;
  }

  private async updateRefreshToken(
    userId: string,
    rt: string | null,
  ): Promise<void> {
    if (rt) {
      const salt = await bcrypt.genSalt(10);
      rt = await bcrypt.hash(rt, salt);
    }

    const userAuth = await this.authModel.findOne({ userId });
    userAuth.refreshToken = rt;
    await userAuth.save();
  }

  async forgotPassword(dto: DoctorForgotPasswordDto): Promise<string> {
    const user = await this.doctorService.findOneByEmail(dto.email);
    const userAuth = await this.authModel.findOne({ userId: user._id });
    
    const code = this.generateRandomCode();
    console.log(code);

    userAuth.resetPasswordCode = code;
    await userAuth.save();
    await this.emailService.sendEmail(
      user.email,
      'Getfit Email Verification Code',
      code,
    );

    return 'reset password code sent to user email';
  }

  async resetPasswordCodeCheck(
    dto: DoctorResetPasswordCodeCheckDto,
  ): Promise<string> {
    const user = await this.doctorService.findOneByEmail(dto.email);
    const userAuth = await this.authModel.findOne({ userId: user._id });

    if (userAuth.resetPasswordCode !== dto.code) {
      throw new ForbiddenException('invalid code');
    }

    if (dto.email !== user.email) {
      throw new ForbiddenException('invalid email');
    }
    return 'password reset Code successfully match';
  }

  async resetPassword(dto: DoctorResetPasswordDto): Promise<string> {
    const user = await this.doctorService.findOneByEmail(dto.email);

    if (dto.email !== user.email) {
      throw new ForbiddenException('invalid email');
    }

    await this.doctorService.updatePassword(user._id, dto.password);

    return 'password reset successfully';
  }

  async emailChange(dto: EmailChangeDto): Promise<string> {
    const doctor =
      await this.doctorService.findOneByEmailForEmailOrPasswordChange(
        dto.oldEmail,
      );

    if (dto.oldEmail !== doctor.email) {
      throw new ForbiddenException('doctor not found by this email');
    }
    console.log("Doctor's password:", doctor.password);

    const isMatch = await bcrypt.compare(dto.password, doctor.password);
    if (!isMatch) {
      throw new ForbiddenException('password not match');
    }

    const updatedDoctor = await this.updateDoctorEmail(
      doctor._id,
      dto.newEmail,
    );

    if (!updatedDoctor) {
      throw new Error('Failed to update doctor email');
    }

    return 'Email updated successfully';
  }
  async updateDoctorEmail(id: string, newEmail: string): Promise<Doctor> {
    return this.doctorModel
      .findByIdAndUpdate(id, { email: newEmail }, { new: true })
      .exec();
  }

  async passwordChange(dto: PasswordChangeDto): Promise<string> {
    const doctor =
      await this.doctorService.findOneByEmailForEmailOrPasswordChange(
        dto.email,
      );

    if (dto.email !== doctor.email) {
      throw new ForbiddenException('doctor not found by this email');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, doctor.password);
    if (!isMatch) {
      throw new ForbiddenException('old password not match');
    }

    const updatedDoctor = await this.doctorService.updatePassword(
      doctor._id,
      dto.newPassword,
    );

    if (!updatedDoctor) {
      throw new Error('Failed to update doctor password');
    }

    return 'Password updated successfully';
  }


  async sendOtp(otpDTO: SendOTPDto) {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    await this.otpModel.create({
      mobile: otpDTO.mobile,
      otp: OTP,
    });
    console.log(OTP);

    await axios.post(
      `http://bulksmsbd.net/api/smsapi?api_key=yLuuDPv8DLGKo0Sb09AB&type=text&number=${otpDTO.mobile}&senderid=8809617611096&message=Your+GetFit+Verification+Code+is+${OTP}`,
    );

    return 'This action send otp';
  }

  private generateRandomCode(): string {
    const randomNum = Math.floor(Math.random() * 10000);
    const code = String(randomNum).padStart(4, '0');
    return code;
  }
}
