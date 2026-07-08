export class ComponentLoader {
  public async loadComponent(type: string): Promise<any> {
    // Dynamic import simulation
    return { type };
  }
}
