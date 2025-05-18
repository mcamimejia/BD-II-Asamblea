import { Test, TestingModule } from '@nestjs/testing';
import { MocionService } from './mocion.service';

describe('MocionService', () => {
  let service: MocionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MocionService],
    }).compile();

    service = module.get<MocionService>(MocionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
