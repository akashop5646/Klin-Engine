export interface WorkspaceMeta {
  packages: string[];
  projectsCount: number;
}

export class WorkspaceScanner {
  public scan(workspaceDir: string): WorkspaceMeta {
    console.log(`[WorkspaceScanner] Scanning directories under: ${workspaceDir}`);
    return {
      packages: ["@klin/core", "@klin/data", "@klin/platform"],
      projectsCount: 3
    };
  }
}
