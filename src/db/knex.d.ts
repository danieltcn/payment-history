import { CLIENTS_TABLE, CURRENCY_TABLE, PAYMENTS_TABLE } from './knex.table';

type ISOStringTimestamp = string;

declare module 'knex/types/result' {
  interface Registry {
    Count: number;
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    [CLIENTS_TABLE]: DBClients;
    [CURRENCY_TABLE]: DBCurrency;
    [PAYMENTS_TABLE]: DBPayment;
  }

  interface DBClients {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }

  interface DBCurrency {
    id: number;
    name: string;
    iso_code: string;
    symbol: string;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }

  interface DBPayment {
    id: number;
    client_id: DBClients['id'];
    currency_id: DBCurrency['id'];
    amount_returned: number;
    created_at: ISOStringTimestamp;
  }
}
