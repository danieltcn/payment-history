import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger: WinstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('payment')
    .setDescription('the payment API ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Payment API Docs',
  };

  SwaggerModule.setup('swagger', app, document, customOptions);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('app.port') as number;

  await app.listen(appPort, () => {
    logger.log('Nest application successfully started on port: ' + appPort);
  });
}
bootstrap();
