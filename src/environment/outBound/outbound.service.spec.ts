import { Test, TestingModule } from '@nestjs/testing';
import { OutBoundServiceConfig } from './outbound.service';

describe('LocationService', () => {
  let service: OutBoundServiceConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutBoundServiceConfig],
    }).compile();

    service = module.get<OutBoundServiceConfig>(OutBoundServiceConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
