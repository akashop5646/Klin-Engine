export interface PlatformJob {
  readonly id: string;
  readonly type: string;
  readonly payload: any;
  status: "Pending" | "Running" | "Completed" | "Failed";
  createdAt: number;
}
