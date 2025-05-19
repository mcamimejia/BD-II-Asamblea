import { Test, TestingModule } from '@nestjs/testing';
import { VotacionMocionService } from './votacion-mocion.service';

describe('VotacionMocionService', () => {
  let service: VotacionMocionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotacionMocionService],
    }).compile();

    service = module.get<VotacionMocionService>(VotacionMocionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
