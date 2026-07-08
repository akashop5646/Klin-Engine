import { Deployment } from "./Deployment";

export class DeploymentHistory {
  private _list: Deployment[] = [];

  public log(deployment: Deployment): void {
    this._list.push(deployment);
  }

  public get history(): Deployment[] {
    return this._list;
  }
}
