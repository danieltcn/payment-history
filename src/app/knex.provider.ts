import { Inject, LoggerService } from '@nestjs/common';
import { KnexModuleOptions, KnexModuleOptionsFactory } from 'nestjs-knex';
import knexfile from '../db/knexfile';
import { types } from 'pg';
import appConfig from '../config/app.config';
import { ConfigType } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Envs } from '../config/config.types';

export class KnexProvider implements KnexModuleOptionsFactory {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConf: ConfigType<typeof appConfig>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.setPgTypeParsing();
  }
  createKnexModuleOptions(): KnexModuleOptions {
    const nodeEnv = this.appConf.nodeEnv as Envs;

    return {
      config: {
        ...knexfile[nodeEnv],
        log: {
          enableColors: true,
          error: (message: string): void => {
            this.logger.error(message, undefined, KnexProvider.name);
          },
          warn: (message: string): void => {
            this.logger.warn(message, KnexProvider.name);
          },
          debug: (message: string): void => {
            if (this.logger.debug) {
              this.logger.debug(message, KnexProvider.name);
            }
          },
        },
      },
    };
  }
  private setPgTypeParsing(): void {
    types.setTypeParser(types.builtins.INT8, parseInt);
    types.setTypeParser(types.builtins.FLOAT8, parseFloat);
    types.setTypeParser(types.builtins.NUMERIC, parseFloat);
  }
}
