import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesPhotoService } from './features-photo.service';

describe('FeaturesPhotoService', () => {
  let service: FeaturesPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeaturesPhotoService],
    }).compile();

    service = module.get<FeaturesPhotoService>(FeaturesPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
