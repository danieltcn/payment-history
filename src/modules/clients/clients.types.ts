import { Client } from './entities/client.entity';

export type ClientGetAll = {
  firstname?: Client['firstname'];
  lastname?: Client['lastname'];
  email?: Client['email'];
};

export type ClientCreate = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
export type ClientUpdate = Partial<ClientCreate>;
