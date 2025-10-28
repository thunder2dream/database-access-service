import { Injectable } from '@nestjs/common';
import { OutBoundServiceConfig } from '../../environment/outBound/outbound.service';

@Injectable()
export class ConfigService {
  private readonly outBoundServiceConfig: OutBoundServiceConfig;

  public constructor() {
    this.outBoundServiceConfig = new OutBoundServiceConfig();
  }

  public databaseServiceConfig(): OutBoundServiceConfig {
    return this.outBoundServiceConfig;
  }
}
