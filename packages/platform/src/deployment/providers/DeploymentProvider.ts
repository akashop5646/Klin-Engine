export interface DeploymentProvider {
  readonly name: string;
  deploy(manifest: any): Promise<boolean>;
  rollback(snapshotId: string): Promise<boolean>;
  verify(): Promise<boolean>;
  health(): Promise<boolean>;
  destroy(): Promise<boolean>;
}
