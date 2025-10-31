export type ProcessEnv<T> = NodeJS.ProcessEnv & T;

export type ProductionGeneric = {
  PRODUCTION: string;
};

export type EnvType<T> = Omit<T, 'PRODUCTION'>;
