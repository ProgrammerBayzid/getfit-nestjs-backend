import { Module } from '@nestjs/common';
import { FeaturesPhotoService } from './features-photo.service';
import { FeaturesPhotoController } from './features-photo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturesPhotoSchema } from './entities/features-photo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FeaturesPhoto', schema: FeaturesPhotoSchema},
    ]),
  ],
  controllers: [FeaturesPhotoController],
  providers: [FeaturesPhotoService],
})
export class FeaturesPhotoModule {}
