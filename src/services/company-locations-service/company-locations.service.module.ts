import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config.module';
import { CompanyLocationsService } from './company-locations.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigServiceModule, HttpModule],
  providers: [CompanyLocationsService],
  exports: [CompanyLocationsService],
})
export class CompanyLocationsServiceModule {
  constructor() {}
}
