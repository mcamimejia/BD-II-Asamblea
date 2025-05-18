import { Test, TestingModule } from '@nestjs/testing';
import { AsambleaService } from './asamblea.service';

describe('AsambleaService', () => {
  let service: AsambleaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsambleaService],
    }).compile();

    service = module.get<AsambleaService>(AsambleaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
