import { Test, TestingModule } from '@nestjs/testing';
import { SubunitController } from './subunit.controller';
import { SubunitService } from './subunit.service';

describe('SubunitController', () => {
  let controller: SubunitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubunitController],
      providers: [SubunitService],
    }).compile();

    controller = module.get<SubunitController>(SubunitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
