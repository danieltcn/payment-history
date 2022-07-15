import type { Knex } from 'knex';
import dbConfig from '../config/config.db';

const dbEnv = dbConfig();

const knexfile: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: dbEnv.host,
      port: dbEnv.port,
      database: dbEnv.database,
      user: dbEnv.user,
      password: dbEnv.password,
      ssl: dbEnv.ssl ? { rejectUnauthorized: false } : false,
    },
    migrations: {
      tableName: 'migration',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    debug: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
};

export default knexfile;
