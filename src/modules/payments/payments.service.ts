import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { verifyEntityExistence } from '../../utils/verify-entity';
import { ClientsService } from '../clients/clients.service';
import { CurrencyService } from '../currency/currency.service';
import { Payment } from './entities/payment.entity';
import { PaymentsRepository } from './payments.repository';
import { PaymentCreate, PaymentGetAll } from './payments.types';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly currencyService: CurrencyService,
    private readonly clientsService: ClientsService,
  ) {}

  async findAll(query: PaymentGetAll = {}): Promise<Payment[]> {
    return this.paymentsRepository.getAll(this.knex, query);
  }

  async findOne(id: Payment['id']): Promise<Payment> {
    return verifyEntityExistence(
      () => this.paymentsRepository.getById(this.knex, id),
      'No Payment with this ID was found.',
    );
  }

  async create(data: PaymentCreate): Promise<Payment> {
    await this.currencyService.findOne(data.currency_id).then((result) => {
      if (!result.id) {
        throw new ConflictException('A Currency with this ID not exist.');
      }
    });
    await this.clientsService.findOne(data.client_id).then((result) => {
      if (!result.id) {
        throw new ConflictException('A Client with this ID not exist.');
      }
    });
    return this.paymentsRepository.create(this.knex, data);
  }

  async remove(id: Payment['id']): Promise<Payment> {
    const previous = await verifyEntityExistence(
      () => this.paymentsRepository.getById(this.knex, id),
      'No Payment with this ID was found.',
    );

    return this.paymentsRepository.delete(this.knex, previous.id);
  }
}
