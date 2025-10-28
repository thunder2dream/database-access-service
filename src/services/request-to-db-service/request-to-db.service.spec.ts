import { Test, TestingModule } from '@nestjs/testing';
import { RequestToDatabaseService } from './request-to-db.service';

describe('RequestToOrganizationService', () => {
  let service: RequestToDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestToDatabaseService],
    }).compile();

    service = module.get<RequestToDatabaseService>(RequestToDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
