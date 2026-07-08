export type BuildEventName =
  | "BuildStarted"
  | "TaskStarted"
  | "TaskCompleted"
  | "BuildCompleted"
  | "BuildFailed";

export interface BuildEvent {
  name: BuildEventName;
  timestamp: string;
  data?: any;
}

export type BuildEventListener = (event: BuildEvent) => void;

export class BuildEventBus {
  private _listeners: Map<BuildEventName, Set<BuildEventListener>> = new Map();

  public subscribe(name: BuildEventName, listener: BuildEventListener): () => void {
    if (!this._listeners.has(name)) {
      this._listeners.set(name, new Set());
    }
    this._listeners.get(name)!.add(listener);

    return () => {
      this._listeners.get(name)?.delete(listener);
    };
  }

  public publish(name: BuildEventName, data?: any): void {
    const event: BuildEvent = {
      name,
      timestamp: new Date().toISOString(),
      data
    };

    const targets = this._listeners.get(name);
    if (targets) {
      for (const listener of targets) {
        try {
          listener(event);
        } catch (e) {
          console.error(`Error in BuildEventBus listener for ${name}:`, e);
        }
      }
    }
  }
}
