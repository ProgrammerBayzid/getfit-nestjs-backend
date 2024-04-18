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
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
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
import { ContactUs } from './entities/contact-us.entity';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { Public } from 'src/common/public.decorator';
import { ContactUsQuery } from './contactus-query/contactus-query';

@ApiTags('contact-us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new contact us' })
  @ApiBody({
    type: CreateContactUsDto,
  })
  @ApiCreatedResponse({
    description: 'The contact us has been successfully created.',
    type: [ContactUs],
  })
  @ApiBearerAuth()
  async createDoctor(
    @Body() createContactUsDto: CreateContactUsDto,
    @GetCurrentUser('userId') userId?: string,
    @GetCurrentUser('role') role?: string,
  ): Promise<ContactUs> {
    return this.contactUsService.create(userId, role, createContactUsDto);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'userId',
    example: '65b0ebb3c3d74595d0fe4103',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'doctorId',
    example: '65b0ebb3c3d74595d0fe4103',
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
  @ApiOperation({ summary: 'Get all saved contact us' })
  @ApiOkResponse({ type: [ContactUs] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of contact us fetched successfully.',
    type: [ContactUs],
    isArray: true,
  })
  async getAllDoctor(
    @Query() queryOptions?: ContactUsQuery,
  ): Promise<ContactUs[]> {
    return this.contactUsService.findAll(queryOptions);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'contact us ID' })
  @ApiOperation({ summary: 'Get contact us By ID' })
  @ApiOkResponse({ type: [ContactUs] })
  async getGetContactUs(
    @Param('id')
    id: string,
  ): Promise<ContactUs> {
    return this.contactUsService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved ContactUs by id' })
  @ApiOkResponse({
    description: 'The ContactUs has been successfully update.',
    type: ContactUs,
  })
  @ApiBody({
    type: UpdateContactUsDto,
  })
  @ApiBearerAuth()
  async updateContactUs(
    @Param('id')
    id: string,
    @Body()
    updateContactUs: UpdateContactUsDto,
  ): Promise<ContactUs> {
    return this.contactUsService.updateById(id, updateContactUs);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved ContactUs by id' })
  @ApiOkResponse({ type: ContactUs })
  async deleteContactUs(
    @Param('id')
    id: string,
  ): Promise<ContactUs> {
    return this.contactUsService.deleteById(id);
  }
}
