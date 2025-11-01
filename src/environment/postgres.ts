import * as fs from 'fs';
import * as path from 'path';
import { ConnectionOptions } from 'tls';
import { PoolConfig } from 'pg';
import { ParserUtils } from './parser.utils';
import { EnvType, ProcessEnv } from './environment.i';
import { ValidatorUtils } from './validator-utils';

// from process env
export interface IEnv {
  POSTGRES_HOST: string;
  POSTGRES_DATABASE: string;
  POSTGRES_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_KEEPALIVE: string;
  POSTGRES_USE_SSL: string;
  POSTGRES_CERT_PATH: string;
  PRODUCTION: string;
  APP_NAME: string;
}

// from config file
export interface IConf {
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;
  keepAlive: boolean;
  ssl: boolean;
  certPath: string;
  applicationName: string;
}

export class PostgresConfig implements PoolConfig {
  public static readonly defaultCconfigFile = path.join(
    __dirname,
    '../assets/conf/app-config.json',
  );
  public static readonly configName = 'postgres';
  public static readonly defaultCertFile = '/app/certs/postgres.crt';
  public static environmentVariables: EnvType<IEnv> = {
    POSTGRES_HOST: 'localhost',
    POSTGRES_DATABASE: 'manage',
    POSTGRES_PORT: '5432',
    POSTGRES_USER: 'postgres',
    POSTGRES_PASSWORD: 'asdf55555',
    POSTGRES_KEEPALIVE: 'true',
    POSTGRES_USE_SSL: 'false',
    POSTGRES_CERT_PATH: '/app/certs/postgres.crt',
    APP_NAME: 'database-access-service',
  };

  public host = 'localhost';
  public database = 'manage';
  public port = 5432;
  public user = 'postgres';
  public password = 'asdf55555';
  public keepAlive = true;
  public ssl: boolean | ConnectionOptions = {
    rejectUnauthorized: false,
    ca: undefined,
  };
  public application_name = 'database-access-service';
  /**
   * Parses config files and process env.
   * @param env
   */
  constructor(env: IEnv = process.env as ProcessEnv<IEnv>) {
    ValidatorUtils.isProduction(env) &&
      ValidatorUtils.validateEnvVariables<EnvType<IEnv>>(
        env,
        PostgresConfig.environmentVariables,
      );

    let conf: Partial<IConf> = {};

    try {
      if (env.PRODUCTION === undefined) {
        const content = fs.readFileSync(
          PostgresConfig.defaultCconfigFile,
          'utf-8',
        );
        conf = JSON.parse(content)[PostgresConfig.configName] || {};
      }
    } catch (e) {
      console.log(e.stack);
      process.exit(-1);
    }

    this.host = env.POSTGRES_HOST || conf.host || this.host;
    this.database = env.POSTGRES_DATABASE || conf.database || this.database;
    this.port = Number(env.POSTGRES_PORT || conf.port || this.port);
    this.user = env.POSTGRES_USER || conf.user || this.user;
    this.password = env.POSTGRES_PASSWORD || conf.password || this.password;
    this.keepAlive = ParserUtils.assignBoolean(
      true,
      env.POSTGRES_KEEPALIVE,
      conf.keepAlive,
    );

    const useSsl = ParserUtils.assignBoolean(
      true,
      env.POSTGRES_USE_SSL,
      conf.ssl,
    );
    this.ssl = useSsl
      ? this.getSslConnectionOptions(
          PostgresConfig.defaultCertFile,
          env.POSTGRES_CERT_PATH || conf.certPath,
        )
      : false;
    this.application_name =
      env.APP_NAME || conf.applicationName || this.application_name;
  }

  /**
   * Reads SSL certificate from specified path, and returns ConnectionOptions of TlsSocket.
   * @param defaultCertPath
   * @param certPath
   */
  public getSslConnectionOptions(
    defaultCertPath: string,
    certPath?: string,
  ): ConnectionOptions {
    try {
      const postgresCertPath = ((p) => (fs.existsSync(p) ? p : undefined))(
        certPath || defaultCertPath,
      );
      const ca = postgresCertPath
        ? fs.readFileSync(postgresCertPath, 'utf-8')
        : undefined;
      return { rejectUnauthorized: !!ca, ca };
    } catch {}

    return { rejectUnauthorized: false };
  }
}
