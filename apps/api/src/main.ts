import { env } from '@cpa/env'
import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from '~/app/app.module'
import { AllExceptionsFilter, HttpExceptionFilter } from '~/app/filters/http-exception.filter'

import { AUTH_COOKIE } from '~/constants'
import { logger } from '~/logger'

import 'reflect-metadata'
;(async () => {
  const app = await NestFactory.create(AppModule, { logger: false })

  app.enableCors({
    credentials: true,
    origin: env.CLIENT_URL
  })
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter(httpAdapter))

  const config = new DocumentBuilder().addCookieAuth(AUTH_COOKIE).setTitle('CPA').setVersion('1.0').build()

  app.setGlobalPrefix('api')

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const PORT = process.env.PORT || '8080'
  await app.listen(PORT, () => logger.info('app running in http://localhost:'.concat(PORT).concat('/api/health')))
})()
