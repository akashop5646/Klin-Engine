export type JobStatus = "Pending" | "Running" | "Completed" | "Failed";

export interface JobConfig {
  id: string;
  name: string;
  payload: any;
  status?: JobStatus;
  error?: string;
  createdAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export class Job {
  public readonly id: string;
  public readonly name: string;
  public readonly payload: any;
  public status: JobStatus;
  public error?: string;
  public readonly createdAt: Date;
  public startedAt?: Date;
  public completedAt?: Date;

  constructor(config: JobConfig) {
    this.id = config.id;
    this.name = config.name;
    this.payload = config.payload;
    this.status = config.status || "Pending";
    this.error = config.error;
    this.createdAt = config.createdAt || new Date();
    this.startedAt = config.startedAt;
    this.completedAt = config.completedAt;
  }
}
