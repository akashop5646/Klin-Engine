export interface StorageProvider {
  uploadFile(file: any): Promise<string>;
}
