export class WebsiteClone {
  public cloneWebsiteInstance(originalId: string): string {
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const cloneId = `site-${originalId}-${randomSuffix}`;
    console.log(`Cloned website instance ${originalId} to new instance: ${cloneId}`);
    return cloneId;
  }
}
