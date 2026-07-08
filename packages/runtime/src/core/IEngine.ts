export interface IEngine {
  initialize(...args: any[]): Promise<void> | void;
  start(): Promise<void> | void;
  stop(): Promise<void> | void;
  dispose(): Promise<void> | void;
}
