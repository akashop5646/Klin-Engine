export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function safeJsonParse(str: string): any | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
