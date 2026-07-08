export interface PlatformConfigOptions {
  publishing: { enableQueue: boolean };
  deployment: { defaultProvider: string };
  billing: { planLimits: boolean };
  marketplace: { updateAlerts: boolean };
  preview: { durationLimitMs: number };
  collaboration: { presenceTimeoutMs: number };
}

export class PlatformConfig {
  public readonly publishing: PlatformConfigOptions["publishing"];
  public readonly deployment: PlatformConfigOptions["deployment"];
  public readonly billing: PlatformConfigOptions["billing"];
  public readonly marketplace: PlatformConfigOptions["marketplace"];
  public readonly preview: PlatformConfigOptions["preview"];
  public readonly collaboration: PlatformConfigOptions["collaboration"];
  private _isFrozen: boolean = false;

  constructor(options: PlatformConfigOptions) {
    this.publishing = options.publishing;
    this.deployment = options.deployment;
    this.billing = options.billing;
    this.marketplace = options.marketplace;
    this.preview = options.preview;
    this.collaboration = options.collaboration;
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public get isFrozen(): boolean {
    return this._isFrozen;
  }
}
