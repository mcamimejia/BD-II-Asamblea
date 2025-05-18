import { Test, TestingModule } from '@nestjs/testing';
import { RolAsambleaService } from './rol-asamblea.service';

describe('RolAsambleaService', () => {
  let service: RolAsambleaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolAsambleaService],
    }).compile();

    service = module.get<RolAsambleaService>(RolAsambleaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
