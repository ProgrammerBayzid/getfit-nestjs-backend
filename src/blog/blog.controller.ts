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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
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
import { Blog } from './entities/blog.entity';
import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { BlogQuery } from './blogQuery/blogQuery';
import { Public } from 'src/common/public.decorator';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new Doctor review' })
  @ApiBody({
    type: CreateBlogDto,
  })
  @ApiCreatedResponse({
    description: 'The Blog has been successfully created.',
    type: [Blog],
  })
  @ApiBearerAuth()
  async createDoctor(
    @Body() createBlog: CreateBlogDto,
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Blog> {
    return this.blogService.create(userId, createBlog);
  }


  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'category',
    example: 'Blog',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'planId',
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
  @ApiOperation({ summary: 'Get all saved Doctor Bank Account' })
  @ApiOkResponse({ type: [Blog] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Doctors fetched successfully.',
    type: [Blog],
    isArray: true,
  })
  async getAllDoctor(@Query() queryOptions?: BlogQuery): Promise<Blog[]> {
    return this.blogService.findAll(queryOptions);
  }


  @Get('/my-blog')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get My blog' })
  @ApiOkResponse({ type: [Blog] })
  @ApiBearerAuth()
  async findMyAccount(
    @GetCurrentUser('userId') userId?: string,
  ): Promise<Blog> {
    return this.blogService.findMyBlog(userId);
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Blog ID' })
  @ApiOperation({ summary: 'Get Bank account By ID' })
  @ApiOkResponse({ type: [Blog] })
  async getGetBlog(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved BAnk Account by id' })
  @ApiOkResponse({
    description: 'The blog bank Account has been successfully update.',
    type: Blog,
  })
  @ApiBody({
    type: UpdateBlogDto,
  })
  @ApiBearerAuth()
  async updatePackage(
    @Param('id')
    id: string,
    @Body()
    updateBlog: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.updateById(id, updateBlog );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Blog by id' })
  @ApiOkResponse({ type: Blog })
  async deleteBankAccount(
    @Param('id')
    id: string,
  ): Promise<Blog> {
    return this.blogService.deleteById(id);
  }
}
