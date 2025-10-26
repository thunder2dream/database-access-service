import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config.module';
import { RequestToOrganizationService } from './request-to-organization.service';

@Module({
  imports: [ConfigServiceModule],
  providers: [RequestToOrganizationService],
  exports: [RequestToOrganizationService],
})
export class RequestToOrganizationServiceModule {
  constructor() {}
}
