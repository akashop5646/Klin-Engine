export class PublishManager {
  public async requestPublish(websiteId: string): Promise<string> {
    console.log(`Publish requested for website: ${websiteId}`);
    return `publish-job-${Math.random().toString(36).substring(2, 9)}`;
  }
}
