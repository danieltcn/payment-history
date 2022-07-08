export const Envs = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export type Envs = typeof Envs[keyof typeof Envs];
