import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '~/app.module';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
} from '~/filters/http-exception.filter';
import { env } from '~/env';

import { logger } from '~/logger';
import { AUTH_COOKIE } from '~/constants';

import 'reflect-metadata';

(async () => {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AllExceptionsFilter(httpAdapter),
  );

  const config = new DocumentBuilder()
    .addCookieAuth(AUTH_COOKIE)
    .setTitle('CPA')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(env.API_PORT, () =>
    logger.info(
      'app running in http://localhost:'
        .concat(env.API_PORT)
        .concat('/api/health'),
    ),
  );
})();
