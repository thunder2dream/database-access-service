import { Module } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config.module';
import { RequestToDatabaseService } from './request-to-db.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigServiceModule, HttpModule],
  providers: [RequestToDatabaseService],
  exports: [RequestToDatabaseService],
})
export class RequestToDatabaseServiceModule {
  constructor() {}
}
