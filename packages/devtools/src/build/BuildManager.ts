import { BuildSession } from "./BuildSession";
import { BuildPipeline } from "./BuildPipeline";
import { BuildProfile } from "./BuildProfile";

export class BuildManager {
  private _pipeline: BuildPipeline;

  constructor(pipeline: BuildPipeline) {
    this._pipeline = pipeline;
  }

  public async runBuild(buildId: string, profile: BuildProfile): Promise<BuildSession> {
    const session = new BuildSession(buildId, profile);
    console.log(`[BuildManager] Launching isolated build session: ${buildId} under profile: ${profile}`);
    await this._pipeline.execute(session);
    return session;
  }
}
