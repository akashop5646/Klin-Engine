export interface PlatformPlugin {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  boot(): Promise<void>;
  ready(): Promise<void>;
  shutdown(): Promise<void>;
  upgrade(): Promise<void>;
  uninstall(): Promise<void>;
}
