import { Module } from '@nestjs/common';
import { CompanyLocationsServiceModule } from '../../services/company-locations-service/company-locations.service.module';
import { RestApiController } from './rest-api.controller';

@Module({
  controllers: [RestApiController],
  imports: [CompanyLocationsServiceModule],
})
export class RestApiModule {}
