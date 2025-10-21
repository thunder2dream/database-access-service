import { Test, TestingModule } from '@nestjs/testing';
import { RequestApiService } from './request-api.service';

describe('RequestApiService', () => {
  let service: RequestApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestApiService],
    }).compile();

    service = module.get<RequestApiService>(RequestApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
