import { Test, TestingModule } from '@nestjs/testing';
import { DoctorReviewController } from './doctor-review.controller';
import { DoctorReviewService } from './doctor-review.service';

describe('DoctorReviewController', () => {
  let controller: DoctorReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorReviewController],
      providers: [DoctorReviewService],
    }).compile();

    controller = module.get<DoctorReviewController>(DoctorReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
