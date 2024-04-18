import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { GetCurrentUser } from 'src/common/get-current-doctor.decorator';
import { DoctorReview } from 'src/doctor-review/entities/doctor-review.entity';
import { DoctorReviewQuery } from 'src/doctor-review/doctorReviewQuery/doctorReviewQuery';
import { Public } from 'src/common/public.decorator';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post()
  // @UsePipes(new ValidationPipe())
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Save new User' })
  // @ApiCreatedResponse({ type: User })
  // async createUser(
  //   @Body()
  //   user: CreateUserDto,
  // ): Promise<User> {
  //   return this.userService.create(user);
  // }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all saved User' })
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  async getUsers(): Promise<{
    allUsers: User[];
    maleUsers: User[];
    femaleUsers: User[];
  }> {
    return this.userService.findAll();
  }

  @Get('/myProfile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get my Profile' })
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  async findMyProfile(
    @GetCurrentUser('userId') userId?: string,
  ): Promise<User> {
    return this.userService.findMyProfile(userId);
  }

  @Get('/myReview')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get my Review' })
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
  @ApiOkResponse({ type: [DoctorReview] })
  @ApiBearerAuth()
  async myAddedReview(
    @GetCurrentUser('userId') userId?: string,
    @Query() queryOptions?: DoctorReviewQuery,
  ): Promise<DoctorReview[]> {
    return this.userService.myAddedReview(userId, queryOptions);
  }

  @Public()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID' })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get saved User by id' })
  @ApiOkResponse({ type: User })
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Patch('/update-profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved User by id' })
  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto,
  })
  async updateUser(
    @GetCurrentUser('userId') userId: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(userId, user as User);
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved User by id' })
  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  async deleteUser(@GetCurrentUser('userId') userId: string): Promise<User> {
    return this.userService.deleteById(userId);
  }
}
