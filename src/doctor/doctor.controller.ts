import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { DoctorQuery } from './doctorQuery/doctorQuery';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { DoctorReview } from 'src/doctor-review/entities/doctor-review.entity';
import { DoctorReviewQuery } from 'src/doctor-review/doctorReviewQuery/doctorReviewQuery';
import { Public } from 'src/common/public.decorator';
import { UpdateVerifyDto } from './dto/update-verify-dto';
import { UpdateRejectDto } from './dto/update-reject-dto';

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Save new Doctor' })
  // @ApiBody({
  //   type: CreateDoctorDto,
  // })
  // @ApiCreatedResponse({
  //   description: 'The doctor has been successfully created.',
  //   type: [Doctor],
  // })
  // async createDoctor(
  //   @Body()
  //   createDoctorDto: CreateDoctorDto,
  // ): Promise<Doctor> {
  //   return this.doctorService.create(createDoctorDto as Doctor);
  // }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'online', example: false, type: Boolean, required: false })
  @ApiQuery({ name: 'reject', example: false, type: Boolean, required: false })
  @ApiQuery({
    name: 'verified',
    example: false,
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'gender',
    example: 'Female',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'averageRating',
    example: 4.8,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'totalRating',
    example: 22,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'speciality',
    example: 'specialityId',
    type: String,
    required: false,
  })
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  @ApiQuery({ name: 'limit', example: 10, type: Number, required: false })
  @ApiQuery({
    name: 'sortBy',
    example: 'consultationFee.consultationFee',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    example: 'asc',
    type: String,
    required: false,
  })
  @ApiOperation({ summary: 'Get all saved Doctor' })
  @ApiOkResponse({ type: [Doctor] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Doctors fetched successfully.',
    type: [Doctor],
    isArray: true,
  })
  async getAllDoctor(@Query() queryOptions?: DoctorQuery): Promise<Doctor[]> {
    return this.doctorService.findAll(queryOptions);
  }

  @Get('/myProfile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get My Profile' })
  @ApiOkResponse({ type: [Doctor] })
  @ApiBearerAuth()
  async findMyProfile(
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Doctor> {
    return this.doctorService.findMyProfile(userId);
  }

  @Get('/myReview')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', example: 1, type: Number, required: false })
  @ApiQuery({ name: 'limit', example: 10, type: Number, required: false })
  @ApiQuery({
    name: 'sortBy',
    example: 'createdAt',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'sortOrder',
    example: 'asc',
    type: String,
    required: false,
  })
  @ApiOperation({ summary: 'Get my Review' })
  @ApiOkResponse({ type: [DoctorReview] })
  @ApiBearerAuth()
  async myAddedReview(
    @GetCurrentUser('userId') userId?: string,
    @Query() queryOptions?: DoctorReviewQuery,
  ): Promise<DoctorReview[]> {
    return this.doctorService.myReview(userId, queryOptions);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Doctor ID' })
  @ApiOperation({ summary: 'Get Doctor By ID' })
  @ApiOkResponse({ type: [Doctor] })
  async getGetDoctor(
    @Param('id')
    id: string,
  ): Promise<Doctor> {
    return this.doctorService.findById(id);
  }

  @Patch('/update-profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Doctor by id' })
  @ApiOkResponse({
    description: 'The doctor has been successfully update.',
    type: Doctor,
  })
  @ApiBody({
    type: UpdateDoctorDto,
  })
  @ApiBearerAuth()
  async updateDoctor(
    @GetCurrentUser('userId') userId: string,
    @Body()
    updateDoctor: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.updateById(userId, updateDoctor);
  }

  @Patch('/verify-doctor/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Doctor by id' })
  @ApiOkResponse({
    description: 'The doctor has been successfully updated.',
    type: Doctor,
  })
  @ApiBody({
    type: UpdateVerifyDto,
  })
  @ApiBearerAuth()
  async updateDoctorById(
    @Param('id') id: string,
    @Body() updateVerifyDto: UpdateVerifyDto,
  ): Promise<Doctor> {
    return this.doctorService.verifyDoctorById(id, updateVerifyDto);
  }

  @Patch('/reject-doctor/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Doctor by id' })
  @ApiOkResponse({
    description: 'The doctor has been successfully updated.',
    type: Doctor,
  })
  @ApiBody({
    type: UpdateRejectDto,
  })
  @ApiBearerAuth()
  async rejectDoctorById(
    @Param('id') id: string,
    @Body() updateRejectDto: UpdateRejectDto,
  ): Promise<Doctor> {
    return this.doctorService.rejectDoctorById(id, updateRejectDto);
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Doctor by id' })
  @ApiOkResponse({ type: Doctor })
  @ApiBearerAuth()
  async deleteUser(@GetCurrentUser('userId') userId: string): Promise<Doctor> {
    return this.doctorService.deleteById(userId);
  }
}
