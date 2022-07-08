import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { LoggerOptions } from 'winston';
import { Inject } from '@nestjs/common';
import appConfig from '../config/app.config';
import { ConfigType } from '@nestjs/config';

export class WinstonLoggerProvider implements WinstonModuleOptionsFactory {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConf: ConfigType<typeof appConfig>,
  ) {}

  public createWinstonModuleOptions(): LoggerOptions {
    return {
      level: this.appConf.debug ? 'debug' : 'info',
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(this.appConf.name, {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    };
  }
}
