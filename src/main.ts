import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import * as helmet from 'helmet';

import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  query: {
    limit: 25,
    cache: 2000,
    alwaysPaginate: true
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
});

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({ origin: ['http://localhost:3000'] });

  const options = new DocumentBuilder()
    .setTitle(' API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('api');

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();
