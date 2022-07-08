export interface ConfigDBData {
  url?: string;
}
export interface SearchLogUpload {
  connectionString?: string;
  containerName?: string;
}

export type LogoUpload = SearchLogUpload;

export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'production'
   */
  env: string;

  /** Database connection details. */

  db: ConfigDBData;
  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}
