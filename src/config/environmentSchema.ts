import * as Joi from 'joi';
import { appSchema } from './app.config';
import { dbSchema } from './config.db';

export const environmentSchema = Joi.object({
  ...dbSchema,
  ...appSchema,
});
