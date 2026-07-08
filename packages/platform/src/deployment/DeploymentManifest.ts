export interface DeploymentManifest {
  readonly websiteId: string;
  readonly snapshotId: string;
  readonly assets: string[];
  readonly functionEndpoints: string[];
  readonly environment: string;
  readonly version: number;
  readonly commitHash: string;
  readonly provider: string;
}
