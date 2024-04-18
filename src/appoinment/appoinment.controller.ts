import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Appoinment } from './entities/appoinment.entity';
import { AppoinmentQuery } from './appoinmentQuery/appoinmentQuery';
import { plainToClass } from 'class-transformer';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';

@ApiTags('appointment')
@Controller('appointment')
export class AppoinmentController {
  constructor(private readonly appoinmentService: AppoinmentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new Appoinment' })
  @ApiBody({
    type: CreateAppoinmentDto,
  })
  @ApiCreatedResponse({
    description: 'The Appoinment has been successfully created.',
    type: [Appoinment],
  })
  async createAppoinment(
    @Body()
    createAppoinmentDto: CreateAppoinmentDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Appoinment> {
    return this.appoinmentService.create(userId, createAppoinmentDto);
  }

  @Get('/user-appointment')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'packageId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'planId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'type',
    example: 'onetime',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'packageExpired',
    example: 'expired',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    example: 'paid',
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all saved Appoinment' })
  @ApiOkResponse({ type: [Appoinment] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Appoinment fetched successfully.',
    type: [Appoinment],
    isArray: true,
  })
  async getAllAppoinment(
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
    @Query() queryOptions?: AppoinmentQuery,
  ): Promise<Appoinment[]> {
    return this.appoinmentService.findAll(userId, role, queryOptions);
  }

  @Get('/all-appointment')
  @HttpCode(HttpStatus.OK)
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
  @ApiQuery({
    name: 'packageId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'planId',
    example: '5ff48e093ecb8200f8b0fff3',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'type',
    example: 'onetime',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'packageExpired',
    example: 'expired',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    example: 'paid',
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all saved Appoinment' })
  @ApiOkResponse({ type: [Appoinment] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Appoinment fetched successfully.',
    type: [Appoinment],
    isArray: true,
  })
  async findAllAppoinment(
    @Query() queryOptions?: AppoinmentQuery,
  ): Promise<Appoinment[]> {
    return this.appoinmentService.findAllAppoinment(queryOptions);
  }

  @Get('/get-doctor-appointment-length')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all saved Appoinment' })
  @ApiOkResponse({ type: [Appoinment] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Appoinment fetched successfully.',
    type: [Appoinment],
    isArray: true,
  })
  async info(@GetCurrentUser('userId') userId?: string): Promise<{}> {
    return this.appoinmentService.findDoctorInfo(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Appoinment ID' })
  @ApiOperation({ summary: 'Get Appoinment By ID' })
  @ApiOkResponse({ type: [Appoinment] })
  async getGetAppoinment(
    @Param('id')
    id: string,
  ): Promise<Appoinment> {
    return this.appoinmentService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved BAnk Account by id' })
  @ApiOkResponse({
    description: 'The blog bank Account has been successfully update.',
    type: Appoinment,
  })
  @ApiBody({
    type: UpdateAppoinmentDto,
  })
  @ApiBearerAuth()
  async updatePackage(
    @Param('id')
    id: string,
    @Body()
    updateAppoinmentDto: UpdateAppoinmentDto,
  ): Promise<Appoinment> {
    return this.appoinmentService.updateById(id, updateAppoinmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Appoinment by id' })
  @ApiOkResponse({ type: Appoinment })
  async deleteAppoinment(
    @Param('id')
    id: string,
  ): Promise<Appoinment> {
    return this.appoinmentService.deleteById(id);
  }
}
