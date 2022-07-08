import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyRepository],
  exports: [CurrencyService],
})
export class CurrencyModule {}
