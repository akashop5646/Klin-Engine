export class DevToolsContext {
  public cwd: string;
  public activeWorkspaceId?: string;
  public packageManager: "npm" | "pnpm" | "yarn" | "bun" = "npm";
  public env: Map<string, string> = new Map();

  constructor(cwd: string) {
    this.cwd = cwd;
  }
}
