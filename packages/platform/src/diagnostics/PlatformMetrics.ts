import { QueueMetrics } from "./collectors/QueueMetrics";
import { DeploymentMetrics } from "./collectors/DeploymentMetrics";
import { WorkspaceMetrics } from "./collectors/WorkspaceMetrics";
import { BillingMetrics } from "./collectors/BillingMetrics";
import { PublishMetrics } from "./collectors/PublishMetrics";
import { AnalyticsMetrics } from "./collectors/AnalyticsMetrics";

export class PlatformMetrics {
  public queue: QueueMetrics = new QueueMetrics();
  public deployment: DeploymentMetrics = new DeploymentMetrics();
  public workspace: WorkspaceMetrics = new WorkspaceMetrics();
  public billing: BillingMetrics = new BillingMetrics();
  public publish: PublishMetrics = new PublishMetrics();
  public analytics: AnalyticsMetrics = new AnalyticsMetrics();
}
