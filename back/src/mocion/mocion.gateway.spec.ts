import { Test, TestingModule } from '@nestjs/testing';
import { MocionGateway } from './mocion.gateway';

describe('MocionGateway', () => {
  let gateway: MocionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MocionGateway],
    }).compile();

    gateway = module.get<MocionGateway>(MocionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
