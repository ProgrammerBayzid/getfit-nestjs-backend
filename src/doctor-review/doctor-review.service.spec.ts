import { Test, TestingModule } from '@nestjs/testing';
import { DoctorReviewService } from './doctor-review.service';

describe('DoctorReviewService', () => {
  let service: DoctorReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorReviewService],
    }).compile();

    service = module.get<DoctorReviewService>(DoctorReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
