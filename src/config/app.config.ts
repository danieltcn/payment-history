import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { Envs } from './config.types';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || Envs.DEVELOPMENT,
  name: process.env.npm_package_name || 'Payrun',
  version: process.env.npm_package_version || '1.0',
  port: (process.env.APP_PORT && parseInt(process.env.APP_PORT)) || 3000,
  debug: process.env.APP_DEBUG === 'true',
}));

export const appSchema = {
  NODE_ENV: Joi.string().allow(...Object.values(Envs)),
  APP_PORT: Joi.number().integer().min(3000),
  APP_DEBUG: Joi.boolean(),
};
