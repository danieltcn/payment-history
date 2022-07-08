import { Knex } from 'knex';
import { CLIENTS_TABLE, CURRENCY_TABLE, PAYMENTS_TABLE } from '../knex.table';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(CLIENTS_TABLE, function (table) {
    table.increments('id');
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').unique().notNullable();
    table.timestamps({ defaultToNow: true });
  });

  await knex.schema.createTable(CURRENCY_TABLE, function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('iso_code').notNullable();
    table.string('symbol', 30).unique().notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable(PAYMENTS_TABLE, function (table) {
    table.increments('id');
    table.integer('client_id').notNullable();
    table
      .foreign('client_id')
      .references(`${CLIENTS_TABLE}.id`)
      .onDelete('RESTRICT');
    table.integer('currency_id').notNullable();
    table
      .foreign('currency_id')
      .references(`${CURRENCY_TABLE}.id`)
      .onDelete('RESTRICT');
    table.integer('amount_returned').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // await knex.schema.table('payment_hystory', function (table) {
  //   table.dropForeign('client_id', 'fk_fkey_client_id');
  //   table.dropForeign('currency_id', 'fk_fkey_currency_id');
  // });
  await knex.schema.dropTable('payment_hystory');
  await knex.schema.dropTable('currency');
  await knex.schema.dropTable('clients');
}
