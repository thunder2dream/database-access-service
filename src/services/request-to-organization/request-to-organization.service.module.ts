import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config.module';
import { RequestToOrganizationService } from './request-to-organization.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigServiceModule, HttpModule],
  providers: [RequestToOrganizationService],
  exports: [RequestToOrganizationService],
})
export class RequestToOrganizationServiceModule {
  constructor() {}
}
