import { BuildProfile } from "./BuildProfile";
import { BuildTimeline } from "./BuildTimeline";

export class BuildSession {
  public readonly buildId: string;
  public readonly profile: BuildProfile;
  public readonly startedAt: number;
  public readonly timeline: BuildTimeline = new BuildTimeline();
  public warnings: string[] = [];
  public errors: string[] = [];
  public artifacts: string[] = [];

  constructor(buildId: string, profile: BuildProfile = "Development") {
    this.buildId = buildId;
    this.profile = profile;
    this.startedAt = Date.now();
  }
}
