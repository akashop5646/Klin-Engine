export interface IncidentLog {
  id: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  message: string;
  timestamp: number;
}

export class IncidentManager {
  private _incidents: IncidentLog[] = [];

  public logIncident(severity: "Low" | "Medium" | "High" | "Critical", message: string): void {
    this._incidents.push({
      id: "inc-" + Math.random().toString(36).substring(2, 9),
      severity,
      message,
      timestamp: Date.now(),
    });
  }

  public get incidents(): IncidentLog[] {
    return this._incidents;
  }
}
