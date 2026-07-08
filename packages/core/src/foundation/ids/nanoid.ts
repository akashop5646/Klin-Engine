import crypto from "crypto";

const alphabet = "useandom-26T198340PX75pxJACKYGoO6ysiadFl9_3h7tce5Hre3y";

export function generateNanoID(size = 21): string {
  const bytes = crypto.randomBytes(size);
  let id = "";
  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
}
