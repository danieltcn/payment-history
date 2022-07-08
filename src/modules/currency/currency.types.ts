import { Currency } from './entities/currency.entity';

export type CurrencyGetAll = {
  name?: Currency['name'];
  iso_code?: Currency['iso_code'];
  symbol?: Currency['symbol'];
};

export type CurrencyCreate = Omit<Currency, 'id' | 'created_at' | 'updated_at'>;
export type CurrencyUpdate = Partial<CurrencyCreate>;
