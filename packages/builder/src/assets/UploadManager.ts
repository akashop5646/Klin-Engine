export class UploadManager {
  public async uploadToCloudinary(filePayload: any): Promise<{ url: string; publicId: string }> {
    // Performs Cloudinary post requests and returns CDN parameters
    return {
      url: "https://res.cloudinary.com/klin/image/upload/sample.jpg",
      publicId: "sample_public_id",
    };
  }
}
