import { Test, TestingModule } from '@nestjs/testing';
import { MotionGateway } from './motion.gateway';

describe('MotionGateway', () => {
  let gateway: MotionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotionGateway],
    }).compile();

    gateway = module.get<MotionGateway>(MotionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
