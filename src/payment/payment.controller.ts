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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
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
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { PaymentQuery } from './paymentQuery/paymentQuery';
import { Public } from 'src/common/public.decorator';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Save new Payment' })
  @ApiCreatedResponse({ type: [Payment] })
  @ApiBearerAuth()
  @ApiBody({
    type: CreatePaymentDto,
  })
  async createPayment(
    @Body()
    createPayment: CreatePaymentDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Payment> {
    return this.paymentService.create(userId, createPayment);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get my payment history' })
  @ApiOkResponse({ type: [Payment] })
  async getAllPayment(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Get('/my-payment-history')
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
  @ApiOperation({ summary: 'Get my payment history' })
  @ApiOkResponse({ type: [Payment] })
  @ApiBearerAuth()
  async myPaymentHistory(
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
    @Query() queryOptions?: PaymentQuery,
  ): Promise<Payment[]> {
    return this.paymentService.myPaymentHistory(userId, role, queryOptions);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Payment ID' })
  @ApiOperation({ summary: 'Get all saved Payment' })
  @ApiOkResponse({ type: [Payment] })
  async getGetPayment(
    @Param('id')
    id: string,
  ): Promise<Payment> {
    return this.paymentService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Payment by id' })
  @ApiOkResponse({ type: Payment })
  async updatePayment(
    @Param('id')
    id: string,
    @Body()
    updatePayment: UpdatePaymentDto,
  ): Promise<Payment> {
    return this.paymentService.updateById(id, updatePayment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Payment by id' })
  @ApiOkResponse({ type: Payment })
  async deletePackage(
    @Param('id')
    id: string,
  ): Promise<Payment> {
    return this.paymentService.deleteById(id);
  }

  @Get('/my-payment-history')
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
  @ApiOperation({ summary: 'Get my payment history' })
  @ApiOkResponse({ type: [Payment] })
  @ApiBearerAuth()
  async myAddedReview(
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
    @Query() queryOptions?: PaymentQuery,
  ): Promise<Payment[]> {
    return this.paymentService.myPaymentHistory(userId, role, queryOptions);
  }
}
