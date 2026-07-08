export class SharePreview {
  public generateShareUrl(websiteId: string, ttlMs: number): string {
    const token = Math.random().toString(36).substring(2, 9);
    const expiresAt = Date.now() + ttlMs;
    return `https://preview.klin.dev/share/${websiteId}?token=${token}&expires=${expiresAt}`;
  }
}
