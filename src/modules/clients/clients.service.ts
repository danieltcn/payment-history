import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { verifyEntityExistence } from '../../utils/verify-entity';
import { ClientsRepository } from './clients.repository';
import { ClientCreate, ClientGetAll, ClientUpdate } from './clients.types';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly clientsRepository: ClientsRepository,
  ) {}
  async findAll(query: ClientGetAll = {}): Promise<Client[]> {
    return this.clientsRepository.getAll(this.knex, query);
  }

  async findOne(id: Client['id']): Promise<Client> {
    return verifyEntityExistence(
      () => this.clientsRepository.getById(this.knex, id),
      'No Client with this ID was found.',
    );
  }

  async create(data: ClientCreate): Promise<Client> {
    await this.clientsRepository
      .getAll(this.knex, { email: data.email })
      .then((result) => {
        if (result.length) {
          throw new ConflictException(
            'A Client with this eMail exists already.',
          );
        }
      });

    return this.clientsRepository.create(this.knex, data);
  }

  async update(id: Client['id'], data: ClientUpdate): Promise<Client> {
    const previous = await verifyEntityExistence(
      () => this.clientsRepository.getById(this.knex, id),
      'No Client with this ID was found.',
    );

    if (data.email) {
      await this.clientsRepository
        .getAll(this.knex, { email: data.email })
        .then((result) => {
          const filtered = result.filter(
            (item) => item.email !== previous.email,
          );

          if (filtered.length) {
            throw new ConflictException(
              'A Client with this eMail exists already.',
            );
          }
        });
    }

    return this.clientsRepository.update(this.knex, previous.id, data);
  }

  async remove(id: Client['id']): Promise<Client> {
    const previous = await verifyEntityExistence(
      () => this.clientsRepository.getById(this.knex, id),
      'No Client with this ID was found.',
    );

    return this.clientsRepository.delete(this.knex, previous.id);
  }
}
