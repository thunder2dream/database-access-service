import { Module } from '@nestjs/common';
import { RequestToOrganizationServiceModule } from '../../services/request-to-organization/request-to-organization.service.module';

@Module({
  imports: [RequestToOrganizationServiceModule],
})
export class RestApiModule {}
