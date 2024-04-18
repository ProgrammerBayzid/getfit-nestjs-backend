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
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';

@ApiTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Save new Plan' })
  @ApiBody({
    type: CreatePlanDto,
  })
  @ApiCreatedResponse({
    description: 'The Plan has been successfully created.',
    type: [Plan],
  })
  @ApiCreatedResponse({ type: Plan })
  async createPlan(
    @Body()
    createPlanDto: CreatePlanDto,
  ): Promise<Plan> {
    return this.planService.create(createPlanDto );
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all saved Plan' })
  @ApiOkResponse({ type: [Plan] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of Plans fetched successfully.',
    type: [Plan],
    isArray: true,
  })
  async getAllPlan(): Promise<Plan[]> {
    return this.planService.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Plan ID' })
  @ApiOperation({ summary: 'Get saved Plan by id' })
  @ApiOkResponse({ type: Plan })
  async getGetPlan(
    @Param('id')
    id: string,
  ): Promise<Plan> {
    return this.planService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update saved Plan by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'List of Plans Update successfully.',
    type: Plan,
    isArray: true,
  })
  async updatePlan(
    @Param('id')
    id: string,
    @Body()
    updatePlan: UpdatePlanDto,
  ): Promise<Plan> {
    return this.planService.updateById(id, updatePlan);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete saved Plan by id' })
  @ApiOkResponse({ type: Plan })
  async deletePlan(
    @Param('id')
    id: string,
  ): Promise<Plan> {
    return this.planService.deleteById(id);
  }
}
