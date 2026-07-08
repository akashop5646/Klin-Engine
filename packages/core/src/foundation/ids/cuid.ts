let counter = 0;

export function generateCUID(): string {
  const timestamp = Date.now().toString(36);
  const count = (counter++).toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `c${timestamp}${count}${random}`;
}
