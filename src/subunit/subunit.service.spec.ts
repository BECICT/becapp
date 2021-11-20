import { Test, TestingModule } from '@nestjs/testing';
import { SubunitService } from './subunit.service';

describe('SubunitService', () => {
  let service: SubunitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubunitService],
    }).compile();

    service = module.get<SubunitService>(SubunitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
