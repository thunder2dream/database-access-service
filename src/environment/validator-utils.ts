import { ProductionGeneric } from './environment.i';

export class ValidatorUtils {
  public static validateEnvVariables<T extends Record<string, any>>(
    env: T,
    environmentVariables: T,
  ) {
    const missingVars: string[] = [];
    const expectedValues: any[] = [];
    Object.keys(environmentVariables).forEach((key) => {
      if (env[key] === undefined || env[key] === null) {
        missingVars.push(key);
        expectedValues.push(environmentVariables[key]);
      }
    });

    if (missingVars.length > 0) {
      const missingVarsMessage = missingVars.join(', ');
      const expectedValuesMessage = expectedValues.join(', ');
      console.error(
        `Configuration error: ${missingVarsMessage} were not set. Expected values like: ${expectedValuesMessage}`,
      );
      console.info('The service failed to start');
      process.exit(-1);
    }
  }

  public static isProduction<T extends ProductionGeneric>(env: T): boolean {
    if (typeof env.PRODUCTION === 'string') {
      return /^true$/i.test(env.PRODUCTION);
    }
    return false;
  }
}
