import { Test, TestingModule } from '@nestjs/testing';
import { ParticipanteAsambleaController } from './participante-asamblea.controller';

describe('ParticipanteAsambleaController', () => {
  let controller: ParticipanteAsambleaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipanteAsambleaController],
    }).compile();

    controller = module.get<ParticipanteAsambleaController>(ParticipanteAsambleaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
