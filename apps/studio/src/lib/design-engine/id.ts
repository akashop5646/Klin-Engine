// ponytail: keep ID generator simple and isolated to prevent circular dependency cycles
let _counter = 0;
export function generateId(prefix = "s"): string {
  return `${prefix}_${Date.now().toString(36)}_${(++_counter).toString(36)}`;
}
