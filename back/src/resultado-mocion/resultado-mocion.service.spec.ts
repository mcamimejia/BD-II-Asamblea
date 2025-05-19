import { Test, TestingModule } from '@nestjs/testing';
import { ResultadoMocionService } from './resultado-mocion.service';

describe('ResultadoMocionService', () => {
  let service: ResultadoMocionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadoMocionService],
    }).compile();

    service = module.get<ResultadoMocionService>(ResultadoMocionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
