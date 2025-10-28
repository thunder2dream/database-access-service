import { SchemaUtility } from '../../schema/validator';
import { JsonSchema } from '../../schema/validator.i';

export interface IEnv {
  DATABASE_SERVICE_BASE_URL: string;
}

export class OutBoundServiceConfig {
  public static readonly configName = 'outBoundService';
  public databaseBaseUrl: string;

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
    this.databaseBaseUrl = env.DATABASE_SERVICE_BASE_URL;
  }

  public guardEnv(env: IEnv) {
    const schema: JsonSchema = {
      $id: `${OutBoundServiceConfig.name}-${OutBoundServiceConfig.prototype.guardEnv.name}`,
      type: 'object',
      required: ['DATABASE_SERVICE_BASE_URL'],
      properties: {
        DATABASE_SERVICE_BASE_URL: {
          type: 'string',
        },
      },
    };
    return SchemaUtility.getSchemaValidator().validate(schema, env);
  }
}
