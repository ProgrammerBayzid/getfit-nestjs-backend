import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { CreateConsultantDto } from './dto/create-consultant.dto';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { Consultant } from './entities/consultant.entity';

@Controller('consultant')
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createConsultant(
    @Body()
    createConsultantDto: CreateConsultantDto,
  ): Promise<Consultant> {
    return this.consultantService.create(createConsultantDto);
  }
  @Get()
  async getAllConsultant(): Promise<Consultant[]> {
    return this.consultantService.findAll();
  }
  @Get(':id')
  async getGetConsultant(
    @Param('id')
    id: string,
  ): Promise<Consultant> {
    return this.consultantService.findById(id);
  }

  @Put(':id')
  async updateConsultant(
    @Param('id')
    id: string,
    @Body()
    updateConsultantDto: UpdateConsultantDto,
  ): Promise<Consultant> {
    return this.consultantService.updateById(id, updateConsultantDto);
  }

  @Delete(':id')
  async deleteConsultant(
    @Param('id')
    id: string,
  ): Promise<Consultant> {
    return this.consultantService.deleteById(id);
  }
}
