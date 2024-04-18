import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { ConsultantSchema } from './entities/consultant.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultantController } from './consultant.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Consultant', schema: ConsultantSchema },
    ]),
  ],
  controllers: [ConsultantController],
  providers: [ConsultantService],
})
export class ConsultantModule {}
