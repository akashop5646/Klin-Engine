import { Project } from "./Project";

export class ProjectManager {
  private _projects: Map<string, Project> = new Map();

  public create(name: string): Project {
    const id = "proj-" + Math.random().toString(36).substring(2, 9);
    const project = new Project(id, name);
    this._projects.set(id, project);
    return project;
  }

  public archive(id: string): void {
    console.log(`Archived project: ${id}`);
  }

  public clone(id: string): Project {
    const project = this._projects.get(id);
    if (!project) {
      throw new Error(`Project ${id} not found.`);
    }
    const cloned = new Project("clone-" + project.id, "Clone of " + project.name);
    cloned.websites = [...project.websites];
    cloned.domains = [...project.domains];
    return cloned;
  }
}
