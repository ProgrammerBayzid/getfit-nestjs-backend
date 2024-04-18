import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema } from './entities/package.entity';
import { PlanSchema } from 'src/plan/entities/plan.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Package', schema: PackageSchema },
      { name: 'Plan', schema: PlanSchema },
    ]),
  ],
  controllers: [PackageController],
  providers: [PackageService],
  exports: [PackageService],
})
export class PackageModule {}
