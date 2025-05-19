import { Test, TestingModule } from '@nestjs/testing';
import { ParticipanteAsambleaService } from './participante-asamblea.service';

describe('ParticipanteAsambleaService', () => {
  let service: ParticipanteAsambleaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipanteAsambleaService],
    }).compile();

    service = module.get<ParticipanteAsambleaService>(ParticipanteAsambleaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
