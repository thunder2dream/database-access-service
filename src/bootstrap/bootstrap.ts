import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfig } from '../environment/app/app';

export class App {
  public static async start(module: any) {
    const app = await NestFactory.create(module);
    await App.setup(app);
  }

  public static async setup(app: INestApplication) {
    const appConfig = new AppConfig();

    app.enableCors({
      //   origin: [appConfig.frontend],
      allowedHeader: '*,Content-Type',
    });

    app.enableShutdownHooks();

    await app.listen(appConfig.port);

    console.log(`Listening the port http://localhost:${appConfig.port}`);
  }
}
