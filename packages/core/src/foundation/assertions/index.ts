export function assert(condition: boolean, message = "Assertion failed"): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function assertDefined<T>(value: T | undefined | null, message = "Value must be defined"): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}

export function assertNever(value: never, message = "Illegal state. Should not be reached."): never {
  throw new Error(`${message}: ${JSON.stringify(value)}`);
}

export function assertUnreachable(value: never): never {
  throw new Error(`Unreachable code path reached for value: ${JSON.stringify(value)}`);
}

export function assertType<T>(
  value: any,
  checkFn: (val: any) => val is T,
  message = "Type assertion failed"
): asserts value is T {
  if (!checkFn(value)) {
    throw new Error(message);
  }
}
