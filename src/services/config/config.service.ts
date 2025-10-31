import { Injectable } from '@nestjs/common';
import { PostgresConfig } from '../../environment/postgres/postgres';

@Injectable()
export class ConfigService {
  private readonly postgres: PostgresConfig;

  public constructor() {
    this.postgres = new PostgresConfig();
  }

  public postgresConfig(): PostgresConfig {
    return this.postgres;
  }
}
