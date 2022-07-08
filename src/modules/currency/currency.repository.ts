import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DBCurrency } from 'knex/types/tables';
import { CURRENCY_TABLE } from '../../db/knex.table';
import { Currency } from '../currency/entities/currency.entity';
import {
  CurrencyCreate,
  CurrencyGetAll,
  CurrencyUpdate,
} from './currency.types';

@Injectable()
export class CurrencyRepository {
  async getAll(knex: Knex, query: CurrencyGetAll = {}): Promise<Currency[]> {
    return knex(CURRENCY_TABLE)
      .select('*')
      .where(function knexFn() {
        if (query.name) {
          this.where('name', 'ilike', `${query.name}%`);
        }
        if (query.iso_code) {
          this.where({ iso_code: query.iso_code });
        }
        if (query.symbol) {
          this.where({ symbol: query.symbol });
        }
      })
      .then((result) => result.map(this.currencyDbTransform));
  }

  async getById(knex: Knex, id: Currency['id']): Promise<Currency | undefined> {
    return knex(CURRENCY_TABLE)
      .first('*')
      .where({ id })
      .then((result) => result && this.currencyDbTransform(result));
  }

  async getByIsoCode(
    knex: Knex,
    iso_code: Currency['iso_code'],
  ): Promise<Currency | undefined> {
    return knex(CURRENCY_TABLE)
      .first('*')
      .where({ iso_code })
      .then((result) => result && this.currencyDbTransform(result));
  }

  async validateIds(
    knex: Knex,
    ids: Currency['id'][],
  ): Promise<{ invalidIds: Currency['id'][] }> {
    return knex(CURRENCY_TABLE)
      .select('id')
      .whereIn('id', ids)
      .then((dbCurrencys) => {
        const mappedDbCurrencys = dbCurrencys.map((item) => item.id);
        const invalidIds = ids.filter(
          (id) => !mappedDbCurrencys.find((item) => item === id),
        );

        return { invalidIds };
      });
  }

  async create(knex: Knex, data: CurrencyCreate): Promise<Currency> {
    return knex(CURRENCY_TABLE)
      .insert({
        name: data.name,
        symbol: data.symbol,
        iso_code: data.iso_code,
      })
      .returning('*')
      .then((result) => this.currencyDbTransform(result[0]));
  }

  async update(
    knex: Knex,
    id: Currency['id'],
    data: CurrencyUpdate,
  ): Promise<Currency> {
    return knex(CURRENCY_TABLE)
      .update({
        name: data.name,
        symbol: data.symbol,
        iso_code: data.iso_code,
        updated_at: knex.fn.now(),
      })
      .where({ id })
      .returning('*')
      .then((result) => this.currencyDbTransform(result[0]));
  }

  async delete(knex: Knex, id: Currency['id']): Promise<Currency> {
    return knex(CURRENCY_TABLE)
      .delete()
      .where({ id })
      .returning('*')
      .then((result) => this.currencyDbTransform(result[0]));
  }

  private currencyDbTransform(dbRow: DBCurrency): Currency {
    return new Currency({
      id: dbRow.id,
      name: dbRow.name,
      symbol: dbRow.symbol,
      iso_code: dbRow.iso_code,
      created_at: dbRow.created_at,
      updated_at: dbRow.updated_at,
    });
  }
}
