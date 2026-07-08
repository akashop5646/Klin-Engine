import { DataContext } from "../core/DataContext";
import { StarterContentBundle } from "./StarterContent";

export class StarterContentInstaller {
  private readonly _context: DataContext;

  constructor(context: DataContext) {
    this._context = context;
  }

  public async install(bundle: StarterContentBundle): Promise<void> {
    for (const sc of bundle.collections) {
      // 1. Ensure collection exists
      await this._context.provider.createCollection(sc.name, {});

      // 2. Insert records
      for (const entry of sc.entries) {
        const payload = {
          id: entry.id,
          collectionName: sc.name,
          status: "Published",
          values: entry.values,
          localizations: entry.localizations || {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await this._context.provider.createEntry(sc.name, payload);
      }
    }
  }
}
