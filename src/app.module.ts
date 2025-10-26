import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestApiController } from './controller/rest-api/rest-api.controller';
import { RestApiModule } from './controller/rest-api/rest-api.module';
import { RequestToOrganizationService } from './services/request-to-organization/request-to-organization.service';
import { ConfigService } from './services/config/config.service';
import { RequestApiModule } from './services/request-api/request-api.module';
import { RequestApiService } from './services/request-api/request-api.service';
import { ConfigModule } from '@nestjs/config';
import { LocationServiceConfigService } from './environment/outBound/location-service-config/location-service-config.service';
import { OutBoundServiceConfig } from './environment/outBound/outbound.service';

@Module({
  imports: [
    RestApiModule,
    RequestApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, RestApiController],
  providers: [
    AppService,
    RequestToOrganizationService,
    RequestApiService,
    ConfigService,
    LocationServiceConfigService,
    OutBoundServiceConfig,
  ],
})
export class AppModule {}
