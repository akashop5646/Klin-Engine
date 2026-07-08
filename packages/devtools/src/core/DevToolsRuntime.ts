export class DevToolsRuntime {
  public workspacePath?: string;
  public activeProjectName?: string;
  public CLICommands: Map<string, any> = new Map();
  public generators: Map<string, any> = new Map();
  private _frozen: boolean = false;

  public freeze(): void {
    this._frozen = true;
    console.log("DevToolsRuntime frozen to ensure determinism.");
  }

  public registerCommand(name: string, cmd: any): void {
    if (this._frozen) {
      throw new Error("Cannot register new commands on a frozen DevToolsRuntime.");
    }
    this.CLICommands.set(name, cmd);
  }

  public get isFrozen(): boolean {
    return this._frozen;
  }
}
