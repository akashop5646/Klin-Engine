import { Query } from "./Query";

export type QueryHandler<T extends Query = any> = (query: T) => Promise<any>;

export class QueryBus {
  private _handlers: Map<string, QueryHandler> = new Map();

  public registerHandler(queryType: string, handler: QueryHandler): void {
    this._handlers.set(queryType, handler);
  }

  public async ask<T extends Query>(query: T): Promise<any> {
    const handler = this._handlers.get(query.type);
    if (!handler) {
      throw new Error(`No handler registered for query: ${query.type}`);
    }
    return await handler(query);
  }
}
