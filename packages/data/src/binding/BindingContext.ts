import { Entry } from "../entities/Entry";

export interface BindingContextConfig {
  currentPage?: any;
  currentProduct?: Entry;
  currentBlog?: Entry;
  currentUser?: any;
  settings?: Record<string, any>;
  custom?: Record<string, any>;
}

export class BindingContext {
  public currentPage?: any;
  public currentProduct?: Entry;
  public currentBlog?: Entry;
  public currentUser?: any;
  public settings: Record<string, any>;
  public custom: Record<string, any>;

  constructor(config: BindingContextConfig = {}) {
    this.currentPage = config.currentPage;
    this.currentProduct = config.currentProduct;
    this.currentBlog = config.currentBlog;
    this.currentUser = config.currentUser;
    this.settings = config.settings || {};
    this.custom = config.custom || {};
  }

  public get(path: string): any {
    const parts = path.split(".");
    const root = parts[0];
    
    let current: any = null;

    if (root === "product") {
      current = this.currentProduct ? this.currentProduct.values : null;
    } else if (root === "blog") {
      current = this.currentBlog ? this.currentBlog.values : null;
    } else if (root === "settings") {
      current = this.settings;
    } else if (root === "user") {
      current = this.currentUser;
    } else if (root === "page") {
      current = this.currentPage;
    } else {
      current = this.custom[root];
    }

    if (!current) return undefined;

    for (let i = 1; i < parts.length; i++) {
      current = current[parts[i]];
      if (current === undefined || current === null) return undefined;
    }

    return current;
  }
}
