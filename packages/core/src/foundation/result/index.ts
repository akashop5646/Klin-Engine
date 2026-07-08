export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  public readonly ok = true as const;
  constructor(public readonly value: T) {}

  map<U>(fn: (val: T) => U): Result<U, E> {
    return new Ok<U, E>(fn(this.value));
  }

  flatMap<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultVal: T): T {
    return this.value;
  }

  match<U>(matches: { ok: (val: T) => U; err: (error: E) => U }): U {
    return matches.ok(this.value);
  }
}

export class Err<T, E> {
  public readonly ok = false as const;
  constructor(public readonly error: E) {}

  map<U>(_fn: (val: T) => U): Result<U, E> {
    return this as any;
  }

  flatMap<U>(_fn: (val: T) => Result<U, E>): Result<U, E> {
    return this as any;
  }

  unwrap(): never {
    throw this.error instanceof Error ? this.error : new Error(String(this.error));
  }

  unwrapOr(defaultVal: T): T {
    return defaultVal;
  }

  match<U>(matches: { ok: (val: T) => U; err: (error: E) => U }): U {
    return matches.err(this.error);
  }
}

export const ok = <T, E = Error>(value: T): Result<T, E> => new Ok(value);
export const err = <T = any, E = Error>(error: E): Result<T, E> => new Err(error);
