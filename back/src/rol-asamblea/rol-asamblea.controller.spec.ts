import { Test, TestingModule } from '@nestjs/testing';
import { RolAsambleaController } from './rol-asamblea.controller';

describe('RolAsambleaController', () => {
  let controller: RolAsambleaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolAsambleaController],
    }).compile();

    controller = module.get<RolAsambleaController>(RolAsambleaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
