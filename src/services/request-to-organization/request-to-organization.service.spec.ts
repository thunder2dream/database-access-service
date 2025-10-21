import { Test, TestingModule } from '@nestjs/testing';
import { RequestToOrganizationService } from './request-to-organization.service';

describe('RequestToOrganizationService', () => {
  let service: RequestToOrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestToOrganizationService],
    }).compile();

    service = module.get<RequestToOrganizationService>(RequestToOrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
