import {
  Controller,
  Post,
  Body,
  Patch,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/public.decorator';
import {
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Tokens } from './types/token.type';
import { DoctorSignUpDto } from './dto/doctor-sing-up.dto';
import { DoctorLoginDto } from './dto/doctor-login.dto';
import { SendOTPDto } from './dto/send-otp.dto';
import { PatientSignUpDto } from './dto/patient-sing-up.dto';
import { PatientLoginDto } from './dto/patient-login.dto';
import { Otp } from './entities/sent-otp-entity';
import { DoctorRefreshToeknDto } from './dto/doctor-refresh-token.dto';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { RtGuard } from 'src/common/guards/refresh-token.guard';
import { DoctorForgotPasswordDto } from './dto/doctor-forgot-password.dto';
import { DoctorResetPasswordDto } from './dto/doctor-reset-password.dto';
import { DoctorResetPasswordCodeCheckDto } from './dto/reset-password-code-check-dto';
import { EmailChangeDto } from './dto/email-change-dto';
import { PasswordChangeDto } from './dto/password-change-dto';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('doctor/signUp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({ type: Tokens })
  doctorSignup(@Body() doctorSignUpDto: DoctorSignUpDto): Promise<Tokens> {
    return this.authService.doctorSignup(doctorSignUpDto);
  }

  @Public()
  @Post('doctor/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to account' })
  @ApiOkResponse({ type: Tokens })
  DoctorLogin(@Body() doctorloginDto: DoctorLoginDto): Promise<Tokens> {
    return this.authService.DoctorLogin(doctorloginDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Patch('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiOkResponse({ type: Tokens })
  @ApiBearerAuth()
  updateTokens(
    @GetCurrentUser('userId') userId: string,
    @Body() refreshToeknDto: DoctorRefreshToeknDto,
  ): Promise<Tokens> {
    console.log(userId);
    console.log(refreshToeknDto);
    return this.authService.updateTokens(userId, refreshToeknDto);
  }

  @Public()
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send email with code to reset password' })
  @ApiOkResponse({ type: String })
  forgotPassword(
    @Body() forgotPasswordDto: DoctorForgotPasswordDto,
  ): Promise<string> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('reset-password-code-check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password Code Check' })
  @ApiOkResponse({ type: String })
  resetPasswordCodeCheck(
    @Body() resetPasswordCodeCheckDto: DoctorResetPasswordCodeCheckDto,
  ): Promise<string> {
    return this.authService.resetPasswordCodeCheck(resetPasswordCodeCheckDto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password' })
  @ApiOkResponse({ type: String })
  resetPassword(
    @Body() resetPasswordDto: DoctorResetPasswordDto,
  ): Promise<string> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @Post('email-change')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'change Email successfully' })
  @ApiOkResponse({ type: 'change Email successfully' })
  emailChange(@Body() emailChangeDto: EmailChangeDto): Promise<string> {
    return this.authService.emailChange(emailChangeDto);
  }

  @Public()
  @Post('password-change')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'change Password successfully' })
  @ApiOkResponse({ type: 'change Password successfully' })
  passwordChange(
    @Body() passwordChangeDto: PasswordChangeDto,
  ): Promise<string> {
    return this.authService.passwordChange(passwordChangeDto);
  }

  // patient

  @Public()
  @Post('patient/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create account' })
  @ApiCreatedResponse({ type: Tokens })
  patientSignUp(@Body() patientSignUpDto: PatientSignUpDto): Promise<Tokens> {
    return this.authService.patientSignUp(patientSignUpDto);
  }

  @Public()
  @Post('patient/sendOtp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Successfully Otp send your number' })
  @ApiOkResponse({ type: Otp })
  @ApiBody({
    type: SendOTPDto,
  })
  async SendOtp(@Body() otpDTO: SendOTPDto) {
    return this.authService.sendOtp(otpDTO);
  }
}
