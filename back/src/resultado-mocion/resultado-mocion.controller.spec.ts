import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoMocionController } from './resultado-mocion.controller';

describe('ResultadoMocionController', () => {
  let controller: ResultadoMocionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultadoMocionController],
    }).compile();

    controller = module.get<ResultadoMocionController>(ResultadoMocionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
