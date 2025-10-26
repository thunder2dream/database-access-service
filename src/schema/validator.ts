import Ajv from 'ajv';
import { JsonSchema } from './validator.i';

export class SchemaValidator {
  constructor(private ajv: Ajv = new Ajv()) {}

  public validate(schema: JsonSchema, data: any): boolean {
    let v = this.ajv.getSchema(schema.$id);
    if (v === undefined) {
      v = this.ajv.compile(schema);
    }
    const valid = v(data);
    if (!valid) {
      if (v.errors) {
        for (const err of v.errors) {
          console.log(
            `SchemaValidator error [${err.instancePath.replace('/', '')}]: ${err.message}`,
            undefined,
            valid,
          );
        }
      }
      return false;
    }
    return true;
  }
}

export class SchemaUtility {
  public static validator: SchemaValidator | null;

  public static getSchemaValidator(ajv?: Ajv) {
    if (!this.validator) {
      this.validator = new SchemaValidator(ajv);
    }

    return this.validator;
  }
}
