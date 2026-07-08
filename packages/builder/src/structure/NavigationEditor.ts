export interface NavigationLink {
  label: string;
  url: string;
  children?: NavigationLink[];
}

export class NavigationEditor {
  private _links: NavigationLink[] = [];

  public getLinks(): NavigationLink[] {
    return this._links;
  }

  public setLinks(links: NavigationLink[]): void {
    this._links = links;
  }
}
