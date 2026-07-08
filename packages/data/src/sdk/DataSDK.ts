import { DataContext } from "../core/DataContext";
import { CollectionAPI } from "../api/CollectionAPI";
import { EntryAPI } from "../api/EntryAPI";
import { QueryAPI } from "../api/QueryAPI";
import { WebsiteInstaller } from "../install/WebsiteInstaller";
import { InstallProfile } from "../install/InstallProfile";

export class DataSDK {
  public readonly context: DataContext;
  public readonly collections: CollectionAPI;
  public readonly entries: EntryAPI;
  public readonly queries: QueryAPI;
  private readonly _installer: WebsiteInstaller;

  constructor(context: DataContext) {
    this.context = context;
    this.collections = new CollectionAPI(context);
    this.entries = new EntryAPI(context);
    this.queries = new QueryAPI(context);
    this._installer = new WebsiteInstaller(context);
  }

  public async installProfile(profile: InstallProfile): Promise<void> {
    await this._installer.install(profile);
  }
}
