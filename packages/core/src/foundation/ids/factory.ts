import { generateNanoID } from "./nanoid";

export type IdPrefix = "cmp" | "blk" | "tpl" | "thm" | "pkg" | "evt";

export function generateId(prefix: IdPrefix): string {
  const shortId = generateNanoID(12);
  return `${prefix}_${shortId}`;
}
