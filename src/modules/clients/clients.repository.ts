import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { Client } from './entities/client.entity';
import { CLIENTS_TABLE } from '../../db/knex.table';
import { DBClients } from 'knex/types/tables';
import { ClientCreate, ClientGetAll, ClientUpdate } from './clients.types';

@Injectable()
export class ClientsRepository {
  async getAll(knex: Knex, query: ClientGetAll = {}): Promise<Client[]> {
    return knex(CLIENTS_TABLE)
      .select('*')
      .where(function knexFn() {
        if (query.lastname) {
          this.where('lastname', 'ilike', `${query.lastname}%`);
        }
        if (query.firstname) {
          this.where('firstname', 'ilike', `${query.firstname}%`);
        }
        if (query.email) {
          this.where({ email: query.email });
        }
      })
      .then((result) => result.map(this.clientDbTransform));
  }

  async getClients(knex: Knex): Promise<Client[]> {
    return knex(CLIENTS_TABLE)
      .select()
      .then((result) => result.map(this.clientDbTransform));
  }

  async getById(knex: Knex, id: Client['id']): Promise<Client | undefined> {
    return knex(CLIENTS_TABLE)
      .first('*')
      .where({ id })
      .then((result) => result && this.clientDbTransform(result));
  }

  async validateIds(
    knex: Knex,
    ids: Client['id'][],
  ): Promise<{ invalidIds: Client['id'][] }> {
    return knex(CLIENTS_TABLE)
      .select('id')
      .whereIn('id', ids)
      .then((dbClients) => {
        const mappedDbClients = dbClients.map((item) => item.id);
        const invalidIds = ids.filter(
          (id) => !mappedDbClients.find((item) => item === id),
        );

        return { invalidIds };
      });
  }

  async create(knex: Knex, data: ClientCreate): Promise<Client> {
    return knex(CLIENTS_TABLE)
      .insert({
        lastname: data.lastname,
        firstname: data.firstname,
        email: data.email,
      })
      .returning('*')
      .then((result) => this.clientDbTransform(result[0]));
  }

  async update(
    knex: Knex,
    id: Client['id'],
    data: ClientUpdate,
  ): Promise<Client> {
    return knex(CLIENTS_TABLE)
      .update({
        lastname: data.lastname,
        firstname: data.firstname,
        email: data.email,
        updated_at: knex.fn.now(),
      })
      .where({ id })
      .returning('*')
      .then((result) => this.clientDbTransform(result[0]));
  }

  async delete(knex: Knex, id: Client['id']): Promise<Client> {
    try {
      return await knex(CLIENTS_TABLE)
        .delete()
        .where({ id })
        .returning('*')
        .then((result) => this.clientDbTransform(result[0]));
    } catch (error) {
      throw new ConflictException(
        'unable to delete client, perhaps this client has transactions',
      );
    }
  }

  private clientDbTransform(dbRow: DBClients): Client {
    return new Client({
      id: dbRow.id,
      firstname: dbRow.firstname,
      lastname: dbRow.lastname,
      email: dbRow.email,
      created_at: dbRow.created_at,
      updated_at: dbRow.updated_at,
    });
  }
}
