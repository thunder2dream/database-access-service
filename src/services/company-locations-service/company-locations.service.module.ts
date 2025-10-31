import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config.module';
import { CompanyLocationsService } from './company-locations.service';
import { HttpModule } from '@nestjs/axios';
import { PostgresServiceModule } from '../postgres/postgres.service.module';

@Module({
  imports: [ConfigServiceModule, HttpModule, PostgresServiceModule],
  providers: [CompanyLocationsService],
  exports: [CompanyLocationsService],
})
export class CompanyLocationsServiceModule {
  constructor() {}
}
