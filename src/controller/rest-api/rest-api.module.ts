import { Module } from '@nestjs/common';
import { RequestToDatabaseServiceModule } from '../../services/request-to-db-service/request-to-db.service.module';
import { RestApiController } from './rest-api.controller';

@Module({
  controllers: [RestApiController],
  imports: [RequestToDatabaseServiceModule],
})
export class RestApiModule {}
