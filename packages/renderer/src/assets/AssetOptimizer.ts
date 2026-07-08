export class AssetOptimizer {
  public getOptimizedUrl(rawUrl: string, width: number, format: "webp" | "jpg" = "webp"): string {
    if (rawUrl.includes("cloudinary.com")) {
      return rawUrl.replace("/upload/", `/upload/w_${width},f_${format},q_auto/`);
    }
    return rawUrl;
  }
}
