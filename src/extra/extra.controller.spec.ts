import { Test, TestingModule } from '@nestjs/testing';
import { ExtraController } from './extra.controller';
import { ExtraService } from './extra.service';

describe('ExtraController', () => {
  let controller: ExtraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtraController],
      providers: [ExtraService],
    }).compile();

    controller = module.get<ExtraController>(ExtraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
