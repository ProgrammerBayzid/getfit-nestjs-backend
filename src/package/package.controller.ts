import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { PackageQuery } from './types/packageQuery.types';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';
@ApiTags('package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  
  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new Package' })
  @ApiBody({
    type: CreatePackageDto,
  })
  @ApiCreatedResponse({
    description: 'The Package has been successfully created.',
    type: [Package],
  })
  async createPackage(
    @Body() createPackageDto: CreatePackageDto,
  ): Promise<Package> {
    return this.packageService.create(createPackageDto);
  }


  @Public()
  @Get()
  @ApiQuery({ name: 'page', example: 1, type: Number, required: true })
  @ApiQuery({ name: 'limit', example: 10, type: Number, required: true })
  @ApiQuery({ name: 'duration', example: 2, type: Number, required: false })
  @ApiQuery({
    name: 'planId',
    example: '65b0ebb3c3d74595d0fe4103',
    type: String,
    required: false,
  })
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
  @ApiOperation({ summary: 'Get all saved Plan' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'list of Package fetched successfully.',
    type: [Package],
    isArray: true,
  })
  async getAllPackage(
    @Query() queryOptions?: PackageQuery,
  ): Promise<Package[]> {
    return this.packageService.findAll(queryOptions);
  }


  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Package ID' })
  @ApiOperation({ summary: 'Get saved Package by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'single Package fetched successfully.',
    type: [Package],
    isArray: true,
  })
  async getGetpackage(
    @Param('id')
    id: string,
  ): Promise<Package> {
    return this.packageService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Package by id' })
  @ApiOkResponse({
    description: 'List of Package update successfully.',
    type: Package,
  })
  async updatePackage(
    @Param('id')
    id: string,
    @Body()
    updatePackage: UpdatePackageDto,
  ): Promise<Package> {
    return this.packageService.updateById(id, updatePackage as Package);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Package by id' })
  @ApiOkResponse({ type: Package })
  async deletePackage(
    @Param('id')
    id: string,
  ): Promise<Package> {
    return this.packageService.deleteById(id);
  }
}
