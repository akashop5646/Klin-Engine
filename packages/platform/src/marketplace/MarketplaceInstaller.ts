export class MarketplaceInstaller {
  public async installPlugin(pluginId: string): Promise<boolean> {
    console.log(`MarketplaceInstaller installing plugin: ${pluginId}`);
    return true;
  }

  public async installTemplate(templateId: string): Promise<boolean> {
    console.log(`MarketplaceInstaller installing template: ${templateId}`);
    return true;
  }
}
