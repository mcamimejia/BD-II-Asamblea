import { Test, TestingModule } from '@nestjs/testing';
import { VotacionMocionController } from './votacion-mocion.controller';

describe('VotacionMocionController', () => {
  let controller: VotacionMocionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotacionMocionController],
    }).compile();

    controller = module.get<VotacionMocionController>(VotacionMocionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
