import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DBPayment } from 'knex/types/tables';
import { PAYMENTS_TABLE } from '../../db/knex.table';
import { Payment } from './entities/payment.entity';
import { PaymentCreate, PaymentGetAll } from './payments.types';

@Injectable()
export class PaymentsRepository {
  async getAll(knex: Knex, query: PaymentGetAll = {}): Promise<Payment[]> {
    return knex(PAYMENTS_TABLE)
      .select('*')
      .where(function knexFn() {
        if (query.start_date) {
          this.where('created_at', '>=', query.start_date.toString());
        }
        if (query.end_date) {
          this.where('created_at', '<', query.end_date.toString());
        }
        if (query.clientId) {
          this.where('client_id', 'ilike', `${query.clientId}%`);
        }
        if (query.currencyId) {
          this.where('currency_id', 'ilike', `${query.currencyId}%`);
        }
      })
      .then((result) => result.map(this.paymentDbTransform));
  }

  async getById(knex: Knex, id: Payment['id']): Promise<Payment | undefined> {
    return knex(PAYMENTS_TABLE)
      .first('*')
      .where({ id })
      .then((result) => result && this.paymentDbTransform(result));
  }

  async validateIds(
    knex: Knex,
    ids: Payment['id'][],
  ): Promise<{ invalidIds: Payment['id'][] }> {
    return knex(PAYMENTS_TABLE)
      .select('id')
      .whereIn('id', ids)
      .then((dbPayments) => {
        const mappedDbPayments = dbPayments.map((item) => item.id);
        const invalidIds = ids.filter(
          (id) => !mappedDbPayments.find((item) => item === id),
        );

        return { invalidIds };
      });
  }

  async create(knex: Knex, data: PaymentCreate): Promise<Payment> {
    return knex(PAYMENTS_TABLE)
      .insert({
        client_id: data.client_id,
        currency_id: data.currency_id,
        amount_returned: data.amount_returned,
      })
      .returning('*')
      .then((result) => this.paymentDbTransform(result[0]));
  }

  async delete(knex: Knex, id: Payment['id']): Promise<Payment> {
    return knex(PAYMENTS_TABLE)
      .delete()
      .where({ id })
      .returning('*')
      .then((result) => this.paymentDbTransform(result[0]));
  }

  private paymentDbTransform(dbRow: DBPayment): Payment {
    return new Payment({
      id: dbRow.id,
      client_id: dbRow.client_id,
      currency_id: dbRow.currency_id,
      amount_returned: dbRow.amount_returned,
      created_at: dbRow.created_at,
    });
  }
}
