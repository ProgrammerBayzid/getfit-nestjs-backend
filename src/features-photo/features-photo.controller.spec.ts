import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesPhotoController } from './features-photo.controller';
import { FeaturesPhotoService } from './features-photo.service';

describe('FeaturesPhotoController', () => {
  let controller: FeaturesPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesPhotoController],
      providers: [FeaturesPhotoService],
    }).compile();

    controller = module.get<FeaturesPhotoController>(FeaturesPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
