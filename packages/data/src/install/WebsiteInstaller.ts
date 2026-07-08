import { DataContext } from "../core/DataContext";
import { InstallProfile } from "./InstallProfile";
import { StarterContentInstaller } from "../starter/StarterContentInstaller";

export class WebsiteInstaller {
  private readonly _context: DataContext;

  constructor(context: DataContext) {
    this._context = context;
  }

  public async install(profile: InstallProfile): Promise<void> {
    // 1. Create collections
    for (const colConfig of profile.collections) {
      await this._context.provider.createCollection(colConfig.name, colConfig);
    }

    // 2. Setup starter content
    const starterInstaller = new StarterContentInstaller(this._context);
    await starterInstaller.install(profile.starterContent);

    // 3. Save website settings/theme configs (mock placeholder setting collection write)
    await this._context.provider.createCollection("Settings", {});
    await this._context.provider.createEntry("Settings", {
      id: "general",
      values: {
        websiteId: this._context.websiteId,
        themeVariables: profile.themeVariables,
        navigation: profile.navigation,
        installedAt: new Date().toISOString(),
      },
    });
  }
}
