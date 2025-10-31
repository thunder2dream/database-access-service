export class ParserUtils {
  public static assignBoolean(
    defaultValue: boolean,
    ...ary: (string | boolean | undefined)[]
  ): boolean {
    for (const val of ary) {
      if (typeof val === 'boolean') return val;
      if (typeof val === 'string') {
        if (/^true$/i.test(val)) return true;
        if (/^false$/i.test(val)) return false;
      }
    }
    return defaultValue;
  }
}
