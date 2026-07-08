export type MiddlewareNext = () => Promise<void>;

export interface DevToolsMiddlewareContext {
  commandName: string;
  args: string[];
}

export class DevToolsMiddleware {
  private _middlewares: Array<(ctx: DevToolsMiddlewareContext, next: MiddlewareNext) => Promise<void>> = [];

  public use(middleware: (ctx: DevToolsMiddlewareContext, next: MiddlewareNext) => Promise<void>): void {
    this._middlewares.push(middleware);
  }

  public async run(ctx: DevToolsMiddlewareContext, action: () => Promise<void>): Promise<void> {
    const execute = async (index: number): Promise<void> => {
      if (index === this._middlewares.length) {
        return action();
      }
      const middleware = this._middlewares[index];
      await middleware(ctx, () => execute(index + 1));
    };

    await execute(0);
  }
}
