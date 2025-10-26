import { SchemaUtility } from '../../schema/validator';
import { JsonSchema } from '../../schema/validator.i';

export interface IEnv {
  LOCATION_SERVICE_BASE_URL: string;
}

export class OutBoundServiceConfig {
  public static readonly configName = 'outBoundService';
  public locationBaseUrl: string;

  constructor(env: IEnv = process.env as any) {
    try {
      if (!this.guardEnv(env)) {
        console.log(`Invalid env in ${OutBoundServiceConfig.name}`);
        process.exit(-1);
      }
    } catch (e: any) {
      console.log(e.message, e.stack);
      process.exit(-1);
    }
    this.locationBaseUrl = env.LOCATION_SERVICE_BASE_URL;
  }

  public guardEnv(env: IEnv) {
    const schema: JsonSchema = {
      $id: `${OutBoundServiceConfig.name}-${OutBoundServiceConfig.prototype.guardEnv.name}`,
      type: 'object',
      required: ['LOCATION_SERVICE_BASE_URL'],
      properties: {
        LOCATION_SERVICE_BASE_URL: {
          type: 'stirng',
        },
      },
    };
    return SchemaUtility.getSchemaValidator().validate(schema, env);
  }
}
