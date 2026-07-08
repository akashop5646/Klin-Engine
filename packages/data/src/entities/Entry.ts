export type EntryStatus =
  | "Draft"
  | "Review"
  | "Approved"
  | "Scheduled"
  | "Published"
  | "Archived";

export interface EntryConfig {
  id: string;
  collectionName: string;
  status?: EntryStatus;
  values?: Record<string, any>;
  localizations?: Record<string, Record<string, any>>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Entry {
  public readonly id: string;
  public readonly collectionName: string;
  public status: EntryStatus;
  public values: Record<string, any>;
  public localizations: Record<string, Record<string, any>>;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(config: EntryConfig) {
    this.id = config.id;
    this.collectionName = config.collectionName;
    this.status = config.status || "Draft";
    this.values = config.values || {};
    this.localizations = config.localizations || {};
    this.createdAt = config.createdAt || new Date();
    this.updatedAt = config.updatedAt || new Date();
  }

  public getLocalizedValue(fieldName: string, locale: string = "en"): any {
    if (locale === "en" || !this.localizations[locale]) {
      return this.values[fieldName];
    }
    return this.localizations[locale][fieldName] ?? this.values[fieldName];
  }

  public setLocalizedValue(fieldName: string, value: any, locale: string): void {
    if (locale === "en") {
      this.values[fieldName] = value;
    } else {
      if (!this.localizations[locale]) {
        this.localizations[locale] = {};
      }
      this.localizations[locale][fieldName] = value;
    }
    this.updatedAt = new Date();
  }

  public createSnapshot(): string {
    return JSON.stringify({
      id: this.id,
      collectionName: this.collectionName,
      status: this.status,
      values: this.values,
      localizations: this.localizations,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    });
  }

  public restoreSnapshot(json: string): void {
    const data = JSON.parse(json);
    this.status = data.status;
    this.values = data.values;
    this.localizations = data.localizations;
    this.updatedAt = new Date(data.updatedAt);
  }
}
