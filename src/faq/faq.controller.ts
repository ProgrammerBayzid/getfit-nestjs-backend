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
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';
import { FaqQuery } from './faqQuery/faqQuery';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';
@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Save new Faq' })
  @ApiCreatedResponse({ type: Faq })
  async createPlan(
    @Body()
    createFaqDto: CreateFaqDto,
  ): Promise<Faq> {
    return this.faqService.create(createFaqDto as Faq);
  }


  @Public()
  @Get()
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
  @ApiOperation({ summary: 'Get all saved Faq' })
  @ApiOkResponse({ type: [Faq] })
  async getAllFaq(@Query() queryOptions?: FaqQuery): Promise<Faq[]> {
    return this.faqService.findAll(queryOptions);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Faq ID' })
  @ApiOperation({ summary: 'Get all saved Faq' })
  @ApiOkResponse({ type: [Faq] })
  async getGetFaq(
    @Param('id')
    id: string,
  ): Promise<Faq> {
    return this.faqService.findById(id);
  }

  @Public()
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Faq by id' })
  @ApiOkResponse({ type: Faq })
  async updateFaq(
    @Param('id')
    id: string,
    @Body()
    updatePlan: UpdateFaqDto,
  ): Promise<Faq> {
    return this.faqService.updateById(id, updatePlan as Faq);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved audio Faq id' })
  @ApiOkResponse({ type: Faq })
  async deleteFaq(
    @Param('id')
    id: string,
  ): Promise<Faq> {
    return this.faqService.deleteById(id);
  }
}
