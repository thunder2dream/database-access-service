export class DatabaseServerError extends Error {
  public readonly code: number;
  public readonly originalError?: unknown;

  constructor(code: number, message: string, originalError?: unknown) {
    super(message);
    this.name = DatabaseServerError.name;
    this.code = code;
    this.originalError = originalError;

    Object.setPrototypeOf(this, DatabaseServerError.prototype);
  }

  public toString(): string {
    return `${this.name}: [${this.code}] ${this.message}`;
  }

  public static isDatabaseServerError(
    err: unknown,
  ): err is DatabaseServerError {
    return (
      !!err &&
      err instanceof Error &&
      (err as any).name === DatabaseServerError.name &&
      typeof (err as any).code === 'number'
    );
  }
}

export class ErrorCode {
  public static readonly BAD_REQUEST = 400;
  public static readonly UNAUTHORIZED = 401;
  public static readonly FORBIDDEN = 403;
  public static readonly NOT_FOUND = 404;
  public static readonly CONFLICT = 409;
  public static readonly INTERNAL = 500;

  public static categorize(err: unknown): DatabaseServerError {
    if (DatabaseServerError.isDatabaseServerError(err)) {
      return err;
    }

    if (err instanceof SyntaxError) {
      return new DatabaseServerError(ErrorCode.BAD_REQUEST, err.message, err);
    }

    if (err instanceof TypeError) {
      return new DatabaseServerError(ErrorCode.BAD_REQUEST, err.message, err);
    }

    return new DatabaseServerError(ErrorCode.INTERNAL, 'Unexpected error', err);
  }
}
