import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { verifyEntityExistence } from '../../utils/verify-entity';
import { CurrencyRepository } from './currency.repository';
import {
  CurrencyCreate,
  CurrencyGetAll,
  CurrencyUpdate,
} from './currency.types';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async findAll(query: CurrencyGetAll = {}): Promise<Currency[]> {
    return this.currencyRepository.getAll(this.knex, query);
  }

  async findOne(id: Currency['id']): Promise<Currency> {
    return verifyEntityExistence(
      () => this.currencyRepository.getById(this.knex, id),
      'No Currency with this ID was found.',
    );
  }

  async create(data: CurrencyCreate): Promise<Currency> {
    await this.currencyRepository
      .getAll(this.knex, { symbol: data.symbol })
      .then((result) => {
        if (result.length) {
          throw new ConflictException(
            'A Currency with this Symbol exists already.',
          );
        }
      });

    await this.currencyRepository
      .getAll(this.knex, { iso_code: data.iso_code })
      .then((result) => {
        if (result.length) {
          throw new ConflictException(
            'A Currency with this ISOCode exists already.',
          );
        }
      });
    return this.currencyRepository.create(this.knex, data);
  }

  async update(id: Currency['id'], data: CurrencyUpdate): Promise<Currency> {
    const previous = await verifyEntityExistence(
      () => this.currencyRepository.getById(this.knex, id),
      'No Symbol with this ID was found.',
    );

    if (data.symbol) {
      await this.currencyRepository
        .getAll(this.knex, { symbol: data.symbol })
        .then((result) => {
          const filtered = result.filter(
            (item) => item.symbol !== previous.symbol,
          );

          if (filtered.length) {
            throw new ConflictException(
              'A Client with this Symbol exists already.',
            );
          }
        });
    }

    return this.currencyRepository.update(this.knex, previous.id, data);
  }

  async remove(id: Currency['id']): Promise<Currency> {
    const previous = await verifyEntityExistence(
      () => this.currencyRepository.getById(this.knex, id),
      'No Currency with this ID was found.',
    );

    return this.currencyRepository.delete(this.knex, previous.id);
  }
}
