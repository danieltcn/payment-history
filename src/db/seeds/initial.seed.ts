import { Knex } from 'knex';
import { CLIENTS_TABLE, CURRENCY_TABLE, PAYMENTS_TABLE } from '../knex.table';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(PAYMENTS_TABLE).del();
  await knex(CLIENTS_TABLE).del();
  await knex(CURRENCY_TABLE).del();

  // Inserts seed entries
  await knex(CLIENTS_TABLE).insert([
    {
      firstname: 'petrica',
      lastname: 'petrosian',
      email: 'dellete@gmail.com',
    },
    {
      firstname: 'vasile',
      lastname: 'sulun',
      email: 'dellete2@gmail.com',
    },
    {
      firstname: 'ionica',
      lastname: 'lonici',
      email: 'dellete3@gmail.com',
    },
    {
      firstname: 'serhei',
      lastname: 'surucean',
      email: 'dellete4@gmail.com',
    },
  ]);

  await knex(CURRENCY_TABLE).insert([
    { name: 'Euro', iso_code: 'EUR', symbol: '€' },
    { name: 'Dolar', iso_code: 'USD', symbol: '$' },
    { name: 'kroner', iso_code: 'nok', symbol: 'nok' },
    { name: 'won sud-coreean', iso_code: 'won', symbol: '₩' },
    { name: 'yen japonese', iso_code: 'yen', symbol: '¥' },
    { name: 'rupie indiana', iso_code: 'rupie', symbol: '₹' },
  ]);

  await knex(PAYMENTS_TABLE).insert([
    {
      client_id: 1,
      currency_id: 2,
      amount_returned: 300,
    },
    {
      client_id: 4,
      currency_id: 1,
      amount_returned: 250,
    },
    {
      client_id: 3,
      currency_id: 1,
      amount_returned: 666,
    },
  ]);
}
