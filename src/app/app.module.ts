import { Module } from '@nestjs/common';
import dbConfig from '../config/config.db';
import appConfig from '../config/app.config';
import { ClientsModule } from '../modules/clients/clients.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { CurrencyModule } from '../modules/currency/currency.module';
import { KnexModule } from 'nestjs-knex/dist/knex.module';
import { KnexProvider } from './knex.provider';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { environmentSchema } from '../config/environmentSchema';
import { WinstonModule } from 'nest-winston';
import { WinstonLoggerProvider } from './logger.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentSchema,
      load: [dbConfig, appConfig],
    }),
    KnexModule.forRootAsync({
      useClass: KnexProvider,
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonLoggerProvider,
    }),
    ClientsModule,
    PaymentsModule,
    CurrencyModule,
  ],
})
export class AppModule {}
