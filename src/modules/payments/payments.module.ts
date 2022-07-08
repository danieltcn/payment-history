import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { ClientsModule } from '../clients/clients.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [ClientsModule, CurrencyModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
  exports: [PaymentsService],
})
export class PaymentsModule {}
