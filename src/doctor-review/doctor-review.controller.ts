import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DoctorReviewService } from './doctor-review.service';
import { CreateDoctorReviewDto } from './dto/create-doctor-review.dto';
import { UpdateDoctorReviewDto } from './dto/update-doctor-review.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DoctorReview } from './entities/doctor-review.entity';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { Public } from 'src/common/public.decorator';
import { DoctorReviewQuery } from './doctorReviewQuery/doctorReviewQuery';
@ApiTags('doctor-review')
@Controller('doctor-review')
export class DoctorReviewController {
  constructor(private readonly doctorReviewService: DoctorReviewService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new Doctor review' })
  @ApiBody({
    type: CreateDoctorReviewDto,
  })
  @ApiCreatedResponse({
    description: 'The doctor has been successfully created.',
    type: [DoctorReview],
  })
  @ApiBearerAuth()
  async createDoctor(
    @Body() createDoctorReviewDto: CreateDoctorReviewDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<DoctorReview> {
    return this.doctorReviewService.create(userId, createDoctorReviewDto);
  }

  @Public()
  @Get()
  @ApiQuery({
    name: 'doctorId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
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
  @ApiOperation({ summary: 'Get all saved doctor Review' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'list of doctor Review fetched successfully.',
    type: [DoctorReview],
    isArray: true,
  })
  async getAllDoctorReview(
    @Query() queryOptions?: DoctorReviewQuery,
  ): Promise<DoctorReview[]> {
    return this.doctorReviewService.findAll(queryOptions);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiOperation({ summary: 'Get saved Review by id' })
  @ApiBearerAuth()
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'single Review fetched successfully.',
    type: [DoctorReview],
    isArray: true,
  })
  async getGetReview(
    @Param('id')
    id: string,
  ): Promise<DoctorReview> {
    return this.doctorReviewService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Review by id' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'List of Review update successfully.',
    type: DoctorReview,
  })
  async updateReview(
    @Param('id')
    id: string,
    @Body()
    updateReview: UpdateDoctorReviewDto,
  ): Promise<DoctorReview> {
    return this.doctorReviewService.updateById(id, updateReview);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Review by id' })
  @ApiOkResponse({ type: DoctorReview })
  @ApiBearerAuth()
  async deleteReview(
    @Param('id')
    id: string,
  ): Promise<DoctorReview> {
    return this.doctorReviewService.deleteById(id);
  }
}
