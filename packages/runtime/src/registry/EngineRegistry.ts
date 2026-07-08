import { IEngine } from "../core/IEngine";

export class EngineRegistry {
  private engines = new Map<string, IEngine>();

  public register(name: string, engine: IEngine): void {
    if (this.engines.has(name)) {
      console.warn(`[Klin EngineRegistry] Engine '${name}' is already registered.`);
    }
    this.engines.set(name, engine);
    console.log(`[Klin EngineRegistry] Registered engine: ${name}`);
  }

  public get<T extends IEngine = IEngine>(name: string): T {
    const engine = this.engines.get(name);
    if (!engine) {
      throw new Error(`[Klin EngineRegistry] Engine not found: ${name}`);
    }
    return engine as T;
  }

  public has(name: string): boolean {
    return this.engines.has(name);
  }

  public getAll(): IEngine[] {
    return Array.from(this.engines.values());
  }
}
