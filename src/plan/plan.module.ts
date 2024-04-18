import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanSchema } from './entities/plan.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema } from 'src/package/entities/package.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Plan', schema: PlanSchema },
      { name: 'Package', schema: PackageSchema },
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
