import { Test, TestingModule } from '@nestjs/testing';
import { AsambleaController } from './asamblea.controller';

describe('AsambleaController', () => {
  let controller: AsambleaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsambleaController],
    }).compile();

    controller = module.get<AsambleaController>(AsambleaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
