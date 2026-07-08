export type ID = string;
export type UUID = string;
export type Timestamp = number;

export type JSONPrimitive = string | number | boolean | null;
export type JSONArray = JSONValue[];
export type JSONObject = { [key: string]: JSONValue };
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = T extends any ? { [P in keyof T]?: DeepPartial<T[P]> } : never;
export type ReadonlyDeep<T> = { readonly [P in keyof T]: ReadonlyDeep<T[P]> };
export type Dictionary<T> = Record<string, T>;
export type AsyncResult<T, E = Error> = Promise<import("@klin/core").Result<T, E>>;
export type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T;
