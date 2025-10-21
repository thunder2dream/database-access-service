import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiController } from './rest-api/rest-api.controller';
import { RestApiModule } from './rest-api/rest-api.module';
import { RequestToOrganizationService } from './services/request-to-organization/request-to-organization.service';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';
import { RequestApiModule } from './services/request-api/request-api.module';
import { RequestApiService } from './services/request-api/request-api.service';

@Module({
  imports: [RestApiModule, RequestApiModule, ConfigModule],
  controllers: [AppController, RestApiController],
  providers: [
    AppService,
    RequestToOrganizationService,
    RequestApiService,
    ConfigService,
  ],
})
export class AppModule {}
