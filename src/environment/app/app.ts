import { SchemaUtility } from '../../schema/validator';
import { JsonSchema } from '../../schema/validator.i';

export interface IEnv {
  APP_CONFIG_PATH?: string;
  SERVER_PORT: string;
  HOSTNAME?: string;
  FRONTEND_DOMAIN: string;
}

export class AppConfig {
  public port: number;
  public frontend: string;

  constructor(env: IEnv = process.env as any) {
    try {
      if (!this.guardEnv(env)) {
        console.log(`Invalid env in ${AppConfig.name}`);
        process.exit(-1);
      }
    } catch (e: any) {
      console.log(e.message, e.stack);
      process.exit(-1);
    }
    this.port = Number(env.SERVER_PORT);
    this.frontend = env.FRONTEND_DOMAIN;
  }

  public guardEnv(env: IEnv) {
    const schema: JsonSchema = {
      $id: `${AppConfig.name}-${AppConfig.prototype.guardEnv.name}`,
      type: 'object',
      required: ['SERVER_PORT', 'FRONTEND_DOMAIN'],
      properties: {
        SERVER_PORT: {
          type: 'string',
        },
        FRONTEND_DOMAIN: {
          type: 'string',
        },
      },
    };
    return SchemaUtility.getSchemaValidator().validate(schema, env);
  }
}
