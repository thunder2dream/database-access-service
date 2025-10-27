import { Module } from '@nestjs/common';
import { RequestToOrganizationServiceModule } from '../../services/request-to-organization/request-to-organization.service.module';
import { RestApiController } from './rest-api.controller';

@Module({
  controllers: [RestApiController],
  imports: [RequestToOrganizationServiceModule],
})
export class RestApiModule {}
