import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, HttpCode, HttpStatus } from '@nestjs/common';
import { FeaturesPhotoService } from './features-photo.service';
import { CreateFeaturesPhotoDto } from './dto/create-features-photo.dto';
import { UpdateFeaturesPhotoDto } from './dto/update-features-photo.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FeaturesPhoto } from './entities/features-photo.entity';
import { Public } from 'src/common/public.decorator';

@Controller('features-photo')
export class FeaturesPhotoController {
  constructor(private readonly featuresPhotoService: FeaturesPhotoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new features-photo' })
  @ApiBody({
    type: CreateFeaturesPhotoDto,
  })
  @ApiCreatedResponse({
    description: 'The FeaturesPhoto has been successfully created.',
    type: [FeaturesPhoto],
  })
  @ApiCreatedResponse({ type: FeaturesPhoto })
  async createPlan(
    @Body()
    createFeaturesPhotoDto: CreateFeaturesPhotoDto,
  ): Promise<FeaturesPhoto> {
    return this.featuresPhotoService.create(createFeaturesPhotoDto );
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all saved FeaturesPhoto' })
  @ApiOkResponse({ type: [FeaturesPhoto] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of FeaturesPhotos fetched successfully.',
    type: [FeaturesPhoto],
    isArray: true,
  })
  async getAllFeaturesPhoto(): Promise<FeaturesPhoto[]> {
    return this.featuresPhotoService.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'FeaturesPhoto ID' })
  @ApiOperation({ summary: 'Get saved FeaturesPhoto by id' })
  @ApiOkResponse({ type: FeaturesPhoto })
  async getGetFeaturesPhoto(
    @Param('id')
    id: string,
  ): Promise<FeaturesPhoto> {
    return this.featuresPhotoService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved FeaturesPhoto by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'List of FeaturesPhotos Update successfully.',
    type: FeaturesPhoto,
    isArray: true,
  })
  async updateFeaturesPhoto(
    @Param('id')
    id: string,
    @Body()
    updateFeaturesPhoto: UpdateFeaturesPhotoDto,
  ): Promise<FeaturesPhoto> {
    return this.featuresPhotoService.updateById(id, updateFeaturesPhoto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved FeaturesPhoto by id' })
  @ApiOkResponse({ type: FeaturesPhoto })
  async deleteFeaturesPhoto(
    @Param('id')
    id: string,
  ): Promise<FeaturesPhoto> {
    return this.featuresPhotoService.deleteById(id);
  }
}
