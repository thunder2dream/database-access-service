import { Module } from '@nestjs/common';
import { RestApiModule } from './controller/rest-api/rest-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RestApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
