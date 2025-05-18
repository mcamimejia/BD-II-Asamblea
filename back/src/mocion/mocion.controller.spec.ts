import { Test, TestingModule } from '@nestjs/testing';
import { MocionController } from './mocion.controller';

describe('MocionController', () => {
  let controller: MocionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MocionController],
    }).compile();

    controller = module.get<MocionController>(MocionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
