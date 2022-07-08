import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('db', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 54324,
  debug: (process.env.DB_DEBUG && Boolean(process.env.DB_DEBUG)) || false,
  database: process.env.DB_DATABASE || 'payment_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: (process.env.DB_SSL && Boolean(process.env.DB_SSL)) || false,
}));

export const dbSchema = {
  DB_HOST: Joi.string().min(1),
  DB_PORT: Joi.number().integer().min(1000),
  DB_DEBUG: Joi.boolean(),
  DB_DATABASE: Joi.string().min(1),
  DB_USER: Joi.string().min(1),
  DB_PASSWORD: Joi.string().min(1),
  DB_SSL: Joi.boolean(),
};
