export interface PreferenceSettings {
  autoSave: boolean;
  autoSaveIntervalMs: number;
  snapToGrid: boolean;
  gridSize: number;
  darkMode: boolean;
  showGuidelines: boolean;
  reducedMotion: boolean;
}

export class Preferences {
  private _settings: PreferenceSettings = {
    autoSave: true,
    autoSaveIntervalMs: 15000,
    snapToGrid: true,
    gridSize: 8,
    darkMode: false,
    showGuidelines: true,
    reducedMotion: false,
  };

  public get settings(): PreferenceSettings {
    return this._settings;
  }

  public update(newSettings: Partial<PreferenceSettings>): void {
    this._settings = { ...this._settings, ...newSettings };
  }
}
